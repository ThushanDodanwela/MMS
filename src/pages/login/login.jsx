import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  lecturerLoginAPI,
  resetPasswordAPI,
  sendOTP,
  verifyOTP,
} from "../../App/LecturerServices";
import { showAlert } from "../../reducers/alertSlice";
import { login } from "../../reducers/loginSlice";

function Login() {
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(0);
  const [sending, setSending] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [OTPCode, setOTPCode] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [validation, setValidation] = useState({
    //error states 0 - initial view 1-error 2-valid
    email: { visibility: 0, message: "" },
    password: { visibility: 0, message: "" },
    retypedPassword: { visibility: 0, message: "" },
    otp: { visibility: 0, message: "" },
  });

  useEffect(() => {
    setValidation({
      email: { visibility: 0, message: "" },
      password: { visibility: 0, message: "" },
      retypedPassword: { visibility: 0, message: "" },
      otp: { visibility: 0, message: "" },
    });
  }, [resetPassword]);

  const dispatcher = useDispatch();
  const verifyEmail = () => {
    if (validateEmail(emailAddress)) {
      setSending(true);
      console.log("Verify email");
      const req = {
        email: emailAddress,
      };
      sendOTP(
        req,
        (data) => {
          if (data.message === "success") {
            setSending(false);
            setResetPassword(2);
          }
        },
        (data) => {
          dispatcher(
            showAlert({
              isVisible: true,
              message: data.message,
              btnText: "",
              btnAction: () => {},
            })
          );
        }
      );
    }
  };

  const verifyCode = () => {
    if (validateOTP(OTPCode)) {
      console.log("Verify code");
      const req = {
        email: emailAddress,
        otp: OTPCode,
      };
      verifyOTP(
        req,
        (data) => {
          if (data.message === "success") {
            setResetPassword(3);
          }
        },
        (data) => {
          dispatcher(
            showAlert({
              isVisible: true,
              message: data.message,
              btnText: "",
              btnAction: () => {},
            })
          );
        }
      );
    }
  };
  const setNewPassword = () => {
    if (comparePasswords(password, retypedPassword)) {
      console.log("set password");
      const req = {
        email: emailAddress,
        password: password,
        otp: OTPCode,
      };
      resetPasswordAPI(
        req,
        (data) => {
          if (data.message === "success") {
            setPassword("");
            setResetPassword(4);
          }
        },
        (data) => {
          dispatcher(
            showAlert({
              isVisible: true,
              message: data.message,
              btnText: "",
              btnAction: () => {},
            })
          );
        }
      );
    }
  };
  const lecturerLogin = () => {
    const emailValid = validateEmail(emailAddress);
    const passwordValid = validatePassword(password);
    if (emailValid && passwordValid) {
      console.log("login");
      const req = {
        email: emailAddress,
        password: password,
      };

      lecturerLoginAPI(
        req,
        (data) => {
          dispatch(
            login({
              isLoggedIn: true,
              lecturerId: data.lecturerId,
              position: data.position,
            })
          );
          if (data.position === "ADMIN") {
            navigate("/");
          } else {
            navigate("/lecturer/dashboard");
          }
        },
        (error) => {
          dispatcher(
            showAlert({
              isVisible: true,
              message: "Username or password is incorrect",
              btnText: "",
              btnAction: () => {},
            })
          );
        }
      );
      setResetPassword(0);
    }
  };

  const SETPS = [
    { text: "Welcome back", btnText: "Login", function: lecturerLogin },
    {
      text: (
        <p>
          Step - 01 <br /> Verify it's you
        </p>
      ),
      btnText: "Send",
      function: verifyEmail,
    },
    {
      text: (
        <p>
          Step - 02 <br /> Check your mails for the code.
        </p>
      ),
      btnText: "Verify",
      function: verifyCode,
    },
    {
      text: (
        <p>
          Step - 03 <br /> Let's create a new password.
        </p>
      ),
      btnText: "Save",
      function: setNewPassword,
    },
    {
      text: (
        <p>
          Step - 04 <br /> Password changed. Login with new one.
        </p>
      ),
      btnText: "Login",
      function: lecturerLogin,
    },
  ];

  const dispatch = useDispatch();

  // ------------------------------- validations ------------------------------
  const validateEmail = (email) => {
    if (email.length > 0) {
      setValidation((prev) => ({
        ...prev,
        email: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        email: {
          visibility: 1,
          message: "Please enter your email address",
        },
      }));
      return false;
    }
  };

  const validatePassword = (password, errorMsg) => {
    if (password.length > 0) {
      setValidation((prev) => ({
        ...prev,
        password: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        password: {
          visibility: 1,
          message: "Please enter your password",
        },
      }));
      return false;
    }
  };
  const comparePasswords = (password1, password2) => {
    if (password1 === password2) {
      setValidation((prev) => ({
        ...prev,
        password: { visibility: 2, message: "" },
        retypedPassword: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        password: {
          visibility: 1,
          message: "Passwords do not match",
        },
        retypedPassword: { visibility: 1, message: "Passwords do not match" },
      }));
      return false;
    }
  };

  const validateOTP = (otp) => {
    if (otp.length > 0) {
      setValidation((prev) => ({
        ...prev,
        otp: { visibility: 2, message: "" },
      }));

      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        otp: {
          visibility: 1,
          message: "Please enter the verification code to continue",
        },
      }));
      return false;
    }
  };
  // ------------------------------- validations ------------------------------

  return (
    <div className="w-100 vh-100 bg-success d-flex justify-content-center align-items-center">
      <div className="col-11 col-md-7 col-lg-4 bg-white p-4">
        <div className="fw-bold fs-4">
          {resetPassword === 0 || resetPassword === 4
            ? "Login"
            : "Reset Passsword"}
        </div>
        <div className="mt-1 fw-semibold ">{SETPS[resetPassword].text}</div>
        {(resetPassword === 0 ||
          resetPassword === 1 ||
          resetPassword === 4) && (
          <div className=" mt-4">
            <div>Email Address</div>
            <Form.Control
              variant="outlined"
              size="small"
              fullWidth
              className="mt-2"
              value={emailAddress}
              onBlur={(e) => {
                validateEmail(e.target.value);
              }}
              onChange={(e) => {
                validateEmail(e.target.value);
                setEmailAddress(e.target.value);
              }}
              {...(validation.email.visibility === 1 && { isInvalid: true })}
              {...(validation.email.visibility === 2 && { isValid: true })}
            />
            <Form.Control.Feedback type="invalid">
              {validation.email.message}
            </Form.Control.Feedback>
          </div>
        )}
        {resetPassword === 2 && (
          <div className="mt-4 ">
            <div>Verification Code</div>
            <Form.Control
              className="mt-2"
              variant="outlined"
              size="small"
              fullWidth
              value={OTPCode}
              onBlur={(e) => {
                validateOTP(e.target.value);
              }}
              onChange={(e) => {
                setOTPCode(e.target.value);
              }}
              {...(validation.otp.visibility === 1 && { isInvalid: true })}
              {...(validation.otp.visibility === 2 && { isValid: true })}
            />
            <Form.Control.Feedback type="invalid">
              {validation.otp.message}
            </Form.Control.Feedback>
          </div>
        )}
        {resetPassword === 3 && (
          <>
            <div className=" mt-2">
              <div>Password</div>
              <Form.Control
                className="mt-2"
                variant="outlined"
                size="small"
                type={"password"}
                fullWidth
                value={password}
                onBlur={(e) => {
                  validatePassword(e.target.value);
                }}
                onChange={(e) => {
                  validatePassword(e.target.value);
                  setPassword(e.target.value);
                }}
                {...(validation.password.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.password.visibility === 2 && { isValid: true })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.password.message}
              </Form.Control.Feedback>
            </div>
            <div className=" mt-2">
              <div>Retype Password</div>
              <Form.Control
                className="mt-2"
                variant="outlined"
                size="small"
                type={"password"}
                fullWidth
                value={retypedPassword}
                onChange={(e) => {
                  comparePasswords(password, e.target.value);
                  setRetypedPassword(e.target.value);
                }}
                {...(validation.retypedPassword.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.retypedPassword.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.retypedPassword.message}
              </Form.Control.Feedback>
            </div>
          </>
        )}
        {(resetPassword === 0 || resetPassword === 4) && (
          <>
            <div className=" mt-2">
              <div>Password</div>
              <Form.Control
                className="mt-2"
                variant="outlined"
                size="small"
                fullWidth
                type={"password"}
                value={password}
                onBlur={(e) => {
                  validatePassword(e.target.value);
                }}
                onChange={(e) => {
                  validatePassword(e.target.value);

                  setPassword(e.target.value);
                }}
                {...(validation.password.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.password.visibility === 2 && { isValid: true })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.password.message}
              </Form.Control.Feedback>
            </div>
            <div className=" mt-2">
              Forgotten Password?
              <Button
                sx={{ textTransform: "none" }}
                className="ms-2"
                onClick={() => {
                  setResetPassword(1);
                }}
              >
                Reset Password
              </Button>
            </div>
          </>
        )}
        {/* somethign */}
        <div className=" mt-4 d-flex justify-content-end  ">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              SETPS[resetPassword].function();
            }}
            {...(sending && {
              endIcon: (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ),
            })}
          >
            {SETPS[resetPassword].btnText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

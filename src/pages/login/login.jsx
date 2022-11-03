import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  lecturerLoginAPI,
  resetPasswordAPI,
  sendOTP,
  verifyOTP,
} from "../../App/LecturerServices";
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

  const verifyEmail = () => {
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
        setErrorMessage(data.message);
        console.log(data.message);
      }
    );
  };

  const verifyCode = () => {
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
        setErrorMessage(data.message);
        console.log(data.message);
      }
    );
  };
  const setNewPassword = () => {
    //TODO: verify two passwords
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
        setErrorMessage(data.message);
        console.log(data.message);
      }
    );
  };
  const lecturerLogin = () => {
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
        alert(error);
      }
    );
    setResetPassword(0);
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

  return (
    <div className="w-100 vh-100 bg-success d-flex justify-content-center align-items-center">
      <div className="col-4 bg-white p-4">
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
            <TextField
              sx={{ mt: 1 }}
              variant="outlined"
              size="small"
              fullWidth
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
            />
          </div>
        )}
        {resetPassword === 2 && (
          <div className="mt-4 ">
            <div>Verification Code</div>
            <TextField
              sx={{ mt: 1 }}
              variant="outlined"
              size="small"
              fullWidth
              value={OTPCode}
              onChange={(e) => {
                setOTPCode(e.target.value);
              }}
            />
          </div>
        )}
        {resetPassword === 3 && (
          <>
            <div className=" mt-2">
              <div>Password</div>
              <TextField
                sx={{ mt: 1 }}
                variant="outlined"
                size="small"
                type={"password"}
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className=" mt-2">
              <div>Retype Password</div>
              <TextField
                sx={{ mt: 1 }}
                variant="outlined"
                size="small"
                type={"password"}
                fullWidth
                value={retypedPassword}
                onChange={(e) => {
                  setRetypedPassword(e.target.value);
                }}
              />
            </div>
          </>
        )}
        {(resetPassword === 0 || resetPassword === 4) && (
          <>
            <div className=" mt-2">
              <div>Password</div>
              <TextField
                sx={{ mt: 1 }}
                variant="outlined"
                size="small"
                fullWidth
                type={"password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
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
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden"></span>
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

import { Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login, loginMMS } from "../../reducers/loginSlice";

function Login() {
  const dispatch = useDispatch();

  return (
    <div className="w-100 vh-100 bg-success d-flex justify-content-center align-items-center">
      <div className="col-4 bg-white p-4">
        <div className="fw-bold fs-4">Login</div>
        <div className="mt-1 fw-semibold ">Welcome back !</div>
        <div className=" mt-4">
          <div>Email Address</div>
          <TextField sx={{ mt: 1 }} variant="outlined" size="small" fullWidth />
        </div>
        <div className=" mt-2">
          <div>Password</div>
          <TextField sx={{ mt: 1 }} variant="outlined" size="small" fullWidth />
        </div>
        <div className=" mt-2">
          Forgotten Password?
          <Button sx={{ textTransform: "none" }} className="ms-2">
            Reset Password
          </Button>
        </div>
        <div className=" mt-4 d-flex justify-content-end  ">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(
                login({
                  isLoggedIn: true,
                  lecturerId: "63629c2bab0639a909672f2e",
                  position: "HOD",
                })
              );
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { LogoutSharp } from "@mui/icons-material";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/School";
import { Button } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/IMSSALOGO.png";
import { logout } from "../../reducers/loginSlice";
import "./Sidebar.scss";

function Sidebar({ section }) {
  const userName = useSelector((state) => state.loginMMS.lecturerName);

  const dispatch = useDispatch();
  return (
    <Col lg={2} className="sidebar bg-success vh-100 position-sticky top-0 ">
      <div className="top d-flex justify-content-start pt-1">
        <span className="logo">
          <img src={logo} alt="" height={70} width={70} />
        </span>
        <span className="fs-2 fw-bold text-white pt-3">MMS</span>
      </div>
      <div className="lists">
        <ul>
          <Link to={"/"} className="text-decoration-none ">
            <li
              className={
                section === `Welcome Back! ${userName},` ? "selected" : " "
              }
            >
              <DashboardIcon />
              <span>Home</span>
            </li>
          </Link>

          <Link to={"/allocations"} className="text-decoration-none ">
            <li className={section === "Allocations" ? "selected" : " "}>
              <CastForEducationIcon />
              <span>Allocations</span>
            </li>
          </Link>

          <Link to={"/modules"} className="text-decoration-none">
            <li className={section === "Modules" ? "selected" : " "}>
              <LibraryBooksIcon />
              <span>Modules</span>
            </li>
          </Link>

          <Link to="/lecturers" className="text-decoration-none">
            <li className={section === "Lecturers" ? "selected" : " "}>
              <SchoolIcon />
              <span>Lecturers</span>
            </li>
          </Link>
        </ul>
        <div style={{ position: "absolute", bottom: "10px", left: "25%" }}>
          <Button
            className="text-white fs-6 "
            sx={{ textTransform: "none", fontWeight: 500 }}
            startIcon={<LogoutSharp />}
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </Col>
  );
}

export default Sidebar;

// Path: src\components\Sidebar\sidebar.scss

import React from "react";
import "./Sidebar.scss";
import logo from "../../assets/IMSSALOGO.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar({ section }) {
  return (
    <Col lg={2} className="sidebar bg-success vh-100 position-fixed">
      <div className="top d-flex justify-content-start pt-1">
        <span className="logo">
          <img src={logo} alt="" height={70} width={70} />
        </span>
        <span className="fs-2 fw-bold text-white pt-3">MMS</span>
      </div>
      <div className="lists">
        <ul>
          <Link to={"/"} className="text-decoration-none ">
            <li className={section === "Dashboard" ? "selected" : " "}>
              <DashboardIcon />
              <span>Dashboard</span>
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
      </div>
    </Col>
  );
}

export default Sidebar;

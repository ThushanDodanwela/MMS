import React from "react";
import "./sidebar.scss";
import logo from "../../assets/IMSSALOGO.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { Col } from "react-bootstrap";


function Sidebar() {
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
          <li>
            <DashboardIcon />
            <span>Dashboard</span>
          </li>
          <li>
            <LibraryBooksIcon />
            <span>Modules</span>
          </li>
          <li>
            <SchoolIcon />
            <span>Lectures</span>
          </li>
          <li>
            <CastForEducationIcon />
            <span>Semesters</span>
          </li>
        </ul>
      </div>
    </Col>
  );
}

export default Sidebar;

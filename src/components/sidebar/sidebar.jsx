import React from "react";
import "./sidebar.scss";
import logo from "../../assets/IMSSALOGO.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";

function sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <img src={logo} alt="" height={100} width={100} />
        </span>
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
    </div>
  );
}

export default sidebar;

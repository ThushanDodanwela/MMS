import React from "react";
import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

function navbar() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="navbar">
      <div className="wrapper">
        <h1>Department of Industrial Management</h1>

        <div className="items">
          {/* <h3> {date}</h3> */}
          <LogoutIcon className="icon" />
        </div>
      </div>
    </div>
  );
}

export default navbar;

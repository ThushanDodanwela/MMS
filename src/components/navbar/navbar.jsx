import React from "react";
import "./Navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Row } from "react-bootstrap";

function Navbar({ section }) {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <Row
      className="m-0 position-sticky top-0 bg-light shadow-sm pt-3 pb-2"
      style={{ zIndex: 50 }}
    >
      <div className="col-11 ">
        <h1 className="fw-bold pt-1">{section}</h1>
      </div>
      <div className="col d-flex justify-content-end pt-3 "></div>
    </Row>
  );
}

export default Navbar;

// Path: src\components\Navbar\navbar.scss

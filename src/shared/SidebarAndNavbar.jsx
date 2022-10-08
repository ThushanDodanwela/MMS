import React from "react";
import { Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const SidebarAndNavbar = ({ section, children }) => {
  return (
    <Col className="d-flex">
      <Sidebar section={section} />
      <Col lg={10}>
        <Navbar section={section} />
        <Row className="m-0">{children}</Row>
      </Col>
    </Col>
  );
};

export default SidebarAndNavbar;

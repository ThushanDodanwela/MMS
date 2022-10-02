import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modules from "./pages/Modules/Modules";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";
import Lecturers from "./pages/Lecturers/Lecturers";
import { useState } from "react";
import Allocations from "./pages/Allocations/Allocations";
import DashboardLecturer from "./pages/DashboardLecturer/DashboardLecturer";

function App() {
  const [navbar, setNavbar] = useState("Dashboard");

  return (
    <div className="App d-flex">
      <BrowserRouter>
        <Sidebar section={navbar} />
        <Col lg={2}></Col>
        <Col lg={10}>
          <Navbar section={navbar} />
          <Row className="m-0">
            <Routes>
              <Route path="/" element={<Home setNavbar={setNavbar} />} />
              <Route path="/modules" element={<Modules setNavbar={setNavbar} />} />
              <Route path="/lecturers" element={<Lecturers setNavbar={setNavbar} />} />
              <Route path="/allocations" element={<Allocations setNavbar={setNavbar} />} />
              <Route path="/lecturer/dashboard" element={<DashboardLecturer setNavbar={setNavbar} />} />
            </Routes>
          </Row>
        </Col>
      </BrowserRouter>
    </div>
  );
}

export default App;

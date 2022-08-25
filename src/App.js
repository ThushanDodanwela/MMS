import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Login from "../src/pages/login/login";
import List from "../src/pages/lists/lists";
import EditModule from "../src/pages/EditModule/editmodule";
import NewModule from "../src/pages/NewModule/newmod";
import EditLecturer from "../src/pages/EditLecturer/editlecturer";
import Newlecturer from "../src/pages/NewLecturer/newLec";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Module from "./pages/Module/Module";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App d-flex">
      <BrowserRouter>
        <Sidebar />
        <Col lg={2}></Col>
        <Col lg={10}>
          <Navbar section="Modules" />
          <Row className="m-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/modules" element={<Module />} />
            </Routes>
          </Row>
        </Col>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./custom.scss";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLecturer from "./pages/DashboardLecturer/DashboardLecturer";
import Home from "./pages/Home/Home";
import Lecturers from "./pages/Lecturers/Lecturers";
import Modules from "./pages/Modules/Modules";
import SidebarAndNavbar from "./shared/SidebarAndNavbar";
import Allocations from "./pages/Allocations/Allocations";
import AllocationsView from "./pages/AllocationsView/AllocationsView";

function App() {
  const [navbar, setNavbar] = useState("Dashboard");

  return (
    <div className="App d-flex">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SidebarAndNavbar section={navbar}>
                <Home setNavbar={setNavbar} />
              </SidebarAndNavbar>
            }
          />

          <Route
            path="/modules"
            element={
              <SidebarAndNavbar section={navbar}>
                <Modules setNavbar={setNavbar} />
              </SidebarAndNavbar>
            }
          />
          <Route
            path="/lecturers"
            element={
              <SidebarAndNavbar section={navbar}>
                <Lecturers setNavbar={setNavbar} />
              </SidebarAndNavbar>
            }
          />
          <Route
            path="/allocations/view"
            element={
              <SidebarAndNavbar section={navbar}>
                <AllocationsView setNavbar={setNavbar} />
              </SidebarAndNavbar>
            }
          />
          <Route
            path="/lecturer/dashboard"
            element={<DashboardLecturer setNavbar={setNavbar} />}
          />
          <Route
            path="/allocations"
            element={
              <SidebarAndNavbar section={navbar}>
                <Allocations setNavbar={setNavbar} />
              </SidebarAndNavbar>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

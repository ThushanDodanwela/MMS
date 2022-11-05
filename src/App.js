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
import Login from "./pages/Login/Login";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./App/store";
import { Provider } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Alert from "./components/Alert/Alert";

function App() {
  const [navbar, setNavbar] = useState("Dashboard");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App d-flex">
          <Alert />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <SidebarAndNavbar section={navbar}>
                      <Home setNavbar={setNavbar} />
                    </SidebarAndNavbar>
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/modules"
                element={
                  <ProtectedRoutes>
                    <SidebarAndNavbar section={navbar}>
                      <Modules setNavbar={setNavbar} />
                    </SidebarAndNavbar>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/lecturers"
                element={
                  <ProtectedRoutes>
                    <SidebarAndNavbar section={navbar}>
                      <Lecturers setNavbar={setNavbar} />
                    </SidebarAndNavbar>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/allocations/view"
                element={
                  <ProtectedRoutes>
                    <SidebarAndNavbar section={navbar}>
                      <AllocationsView setNavbar={setNavbar} />
                    </SidebarAndNavbar>
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/lecturer/dashboard"
                element={
                  <ProtectedRoutes>
                    <DashboardLecturer setNavbar={setNavbar} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/allocations"
                element={
                  <ProtectedRoutes>
                    <SidebarAndNavbar section={navbar}>
                      <Allocations setNavbar={setNavbar} />
                    </SidebarAndNavbar>
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;

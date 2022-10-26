import React from "react";
import LecturerDashboardLargeCard from "../../components/LecturerDashboardLargeCard/LecturerDashboardLargeCard";
import LecturerDashboardSmallCard from "../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import logo from "../../assets/IMSSALOGO.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterListIcon from "@mui/icons-material/FilterList";

function DashboardLecturer({ setNavbar }) {
  setNavbar("Dashboard");
  return (
    <div className="col-12">
      <div className="d-flex justify-content-between bg-success py-2">
        <div className="d-flex ps-3 align-items-center">
          <div>
            <img src={logo} alt="" height={50} width={50} />
          </div>
          <div className="fs-3 fw-semibold text-light">MMS</div>
        </div>
        <div className="d-flex pe-2 align-items-center text-light">
          <div className=" me-3">
            <NotificationsIcon />
          </div>
          <div className=" me-3">
            <AccountCircleIcon />
          </div>
        </div>
      </div>

      {/* content */}
      <div className="px-3">
        <div>
          <div className="fs-3 fw-semibold py-2"> Dashboard</div>
        </div>

        {/* searchbar */}
        <div>
          <SearchBar />
        </div>

        <div className="d-flex justify-content-between mt-3 ">
          <LecturerDashboardSmallCard count="27" />
          <LecturerDashboardSmallCard title="Exams ongoing" count="10" />
          <LecturerDashboardSmallCard title="Paper marking" count="10" />
          <LecturerDashboardSmallCard title="Pending Results" count="05" />
          <LecturerDashboardSmallCard title="Lectures ongoing" count="02" />
        </div>
        <div className="mt-3 fs-5 fw-semibold">All courses</div>
        <div className="mt-3 d-flex flex-wrap gap-1">
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
          <ModuleCard
            moduleCode="MGTE"
            moduleName="WEB APPLICAIRON"
            level="2"
            semester="2"
            state=" Exams ongoing"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardLecturer;

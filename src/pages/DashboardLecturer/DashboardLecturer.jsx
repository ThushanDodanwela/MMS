import React from "react";
import LecturerDashboardLargeCard from "../../components/LecturerDashboardLargeCard/LecturerDashboardLargeCard";
import LecturerDashboardSmallCard from "../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import SearchBar from "../../components/SearchBar/SearchBar";
function DashboardLecturer({ setNavbar }) {
  setNavbar("Dashboard");
  return (
    <div className="col-12">
      <div className="d-flex justify-content-between bg-success py-4">
        <div className="d-flex ps-3">
          <div>logo</div>
          <div>MMS</div>
        </div>
        <div className="d-flex pe-2">
          <div>notification</div>
          <div>profile</div>
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
          <LecturerDashboardSmallCard />
          <LecturerDashboardSmallCard />
          <LecturerDashboardSmallCard />
          <LecturerDashboardSmallCard />
          <LecturerDashboardSmallCard />
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

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import logo from "../../assets/IMSSALOGO.png";
import EditStatus from "../../components/EditStatus/EditStatus";
import LecturerDashboardSmallCard from "../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatusDetails from "../../components/StatusDetails/StatusDetails";

function DashboardLecturer({ setNavbar }) {
  setNavbar("Dashboard");

  const [show, setShow] = useState(false);
  const [showStatusDetails, setShowStatusDetails] = useState(true);
  const handleClose = () => setShow(false);
  const handleCloseStatusDetails = () => setShowStatusDetails(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-12">
      <EditStatus show={show} handleClose={handleClose} />
      <StatusDetails
        show={showStatusDetails}
        handleClose={handleCloseStatusDetails}
      />
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

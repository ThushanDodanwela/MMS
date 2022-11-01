import { ViewModuleSharp } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import { getAllocationsByLecturer } from "../../App/AllocationsServices";
import logo from "../../assets/IMSSALOGO.png";
import EditStatus from "../../components/EditStatus/EditStatus";
import LecturerDashboardSmallCard from "../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatusDetails from "../../components/StatusDetails/StatusDetails";

function DashboardLecturer({ setNavbar }) {
  const [allocations, setAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [batch, setBatch] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const lectureId = "635eb42ff99324c6bd6484b5";
  const module = {
    _id: "636029f234ff61c36e3f33ca",
    moduleCode: "GNCT 32216",
    moduleName: "Internship (2019/2022)",
    level: "1",
    credits: "5",
    semester: "1",
    __v: 0,
  };
  const state = [
    {
      name: "PAPER_MARKING_II",
      date: "2022-11-23T00:00:00.000Z",
      _id: "63602f36f5f9b517d87aae00",
    },
  ];

  setNavbar("Dashboard");

  const onSuccess = (data) => {
    data.allocations?.map((module) => {
      setBatch((prev) => {
        let isExist = prev.filter((val) => val === module.batch);
        if (isExist.length > 0) {
          return [...prev];
        } else {
          return [...prev, module.batch];
        }
      });
    });
    setAllocations(data.allocations);
  };

  useEffect(() => {
    let reqObj = {
      lecturerId: lectureId,
    };
    getAllocationsByLecturer(reqObj, onSuccess);
  }, []);

  useEffect(() => {
    console.log(allocations);
    console.log(batch);
  }, [allocations, batch]);

  useEffect(() => {
    if (searchKeyword.length > 1) {
      let keyword = searchKeyword.toLowerCase();
      setFilteredAllocations(
        allocations.filter(
          (module) =>
            module.module.moduleName.toLowerCase().match(keyword) ||
            module.module.moduleCode.toLowerCase().match(keyword)
        )
      );
    } else {
      setFilteredAllocations(allocations);
    }
  }, [searchKeyword]);

  const CoursesView = ({ title, modules }) => {
    return (
      <>
        {modules.length > 0 && (
          <div>
            <div className="mt-3 fs-5 fw-semibold">{title}</div>
            <div className="mt-3 d-flex flex-wrap gap-1">
              {modules.map((oneModule, index) => {
                return (
                  <ModuleCard
                    key={index}
                    {...oneModule.module}
                    state={oneModule.state}
                    onClick={handleShowStatusDetails}
                    editClick={handleShowEditStatus}
                    handleCloseStatusDetails={handleCloseStatusDetails}
                  />
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };

  const [editStatusShow, setEditStatusShow] = useState(false);
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const handleClose = () => setEditStatusShow(false);
  const handleCloseStatusDetails = () => setShowStatusDetails(false);
  const handleShowEditStatus = () => setEditStatusShow(true);
  const handleShowStatusDetails = () => setShowStatusDetails(true);

  return (
    <div className="col-12">
      <EditStatus show={editStatusShow} setShowEditStatus={handleClose} />
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
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </div>

        <div className="d-flex justify-content-between mt-3 ">
          <LecturerDashboardSmallCard count="27" />
          <LecturerDashboardSmallCard title="Exams ongoing" count="10" />
          <LecturerDashboardSmallCard title="Paper marking" count="10" />
          <LecturerDashboardSmallCard title="Pending Results" count="05" />
          <LecturerDashboardSmallCard title="Lectures ongoing" count="02" />
        </div>
        {batch.map((batch, index) => {
          let module = filteredAllocations.filter(
            (module) => module.batch === batch
          );
          console.log("Modules:", module);
          return <CoursesView key={index} title={batch} modules={module} />;
        })}
      </div>
    </div>
  );
}

export default DashboardLecturer;

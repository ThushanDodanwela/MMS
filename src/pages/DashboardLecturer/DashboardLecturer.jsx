import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllocations,
  getAllocationsByLecturer,
} from "../../App/AllocationsServices";
import logo from "../../assets/IMSSALOGO.png";
import EditStatus from "../../components/EditStatus/EditStatus";
import LecturerDashboardSmallCard from "../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import StatusDetails from "../../components/StatusDetails/StatusDetails";
import { logout } from "../../reducers/loginSlice";

function DashboardLecturer({ setNavbar }) {
  const dispatch = useDispatch();
  const lectureId = useSelector((state) => state.loginMMS.lecturerId);
  const position = useSelector((state) => state.loginMMS.position);

  const [allocations, setAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]); //filterd
  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]); //filtered
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("NONE");
  const [statusInfo, setStatusInfo] = useState("");
  const [editStatusShow, setEditStatusShow] = useState(false);
  const [showStatusDetails, setShowStatusDetails] = useState(false);
  const [moduleDetails, setModuleDetails] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [cardData, setCardData] = useState({
    lecturers_ongoing: 0,
    exams_ongoing: 0,
    paper_marking_one: 0,
    paper_marking_two: 0,
    results_released: 0,
  });

  setNavbar("Dashboard");

  const onSuccess = (data) => {
    let batchArray = [];

    let ONGOING_LECTURES = 0;
    let EXAMS_ONGOING = 0;
    let PAPER_MARKING_I = 0;
    let PAPER_MARKING_II = 0;
    let RESULTS_RELEASED = 0;

    data.allocations?.forEach((module) => {
      console.log("module", module);
      switch (module?.state[module?.state.length - 1].name) {
        case "ONGOING_LECTURES":
          ONGOING_LECTURES++;
          break;
        case "EXAMS_ONGOING":
          EXAMS_ONGOING++;
          break;
        case "PAPER_MARKING_I":
          PAPER_MARKING_I++;
          break;
        case "PAPER_MARKING_II":
          PAPER_MARKING_II++;
          break;
        case "RESULTS_RELEASED":
          RESULTS_RELEASED++;
          break;
        default:
          break;
      }
      let isExist = batchArray.filter((val) => val === module.batch);
      if (isExist.length === 0) {
        batchArray.push(module.batch);
      }
    });
    setBatch(batchArray.reverse());
    setAllocations(data.allocations);
    setCardData({
      lecturers_ongoing: ONGOING_LECTURES,
      exams_ongoing: EXAMS_ONGOING,
      paper_marking_one: PAPER_MARKING_I,
      paper_marking_two: PAPER_MARKING_II,
      results_released: RESULTS_RELEASED,
    });
  };

  useEffect(() => {
    if (position === "HOD") {
      getAllocations(onSuccess);
    } else {
      let reqObj = {
        lecturerId: lectureId,
      };
      getAllocationsByLecturer(reqObj, onSuccess);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editStatusShow]);

  useEffect(() => {
    if (searchKeyword.length > 0) {
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
    if (filterBy !== "NONE") {
      console.log("filterign");
      setFilteredAllocations((prev) =>
        prev.filter(
          (module) => module.state[module.state.length - 1].name === filterBy
        )
      );
    }
  }, [searchKeyword, allocations, filterBy]);

  const CoursesView = ({ title, modules }) => {
    return (
      <>
        {modules.length > 0 && (
          <div>
            <div className="mt-3 fs-5 fw-semibold">{title}</div>
            <div className="mt-3 d-flex flex-wrap gap-1">
              {modules.map((oneModule, index) => {
                console.log("one module", oneModule);
                return (
                  <ModuleCard
                    key={index}
                    {...oneModule.module}
                    module={oneModule}
                    allocationId={oneModule._id}
                    state={oneModule.state}
                    viewSummeryClick={handleShowStatusDetails}
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

  const handleClose = () => setEditStatusShow(false);
  const handleCloseStatusDetails = () => setShowStatusDetails(false);
  const handleShowEditStatus = (_id, currentStatus, lastUpdatedOn) => {
    setCurrentInfo({
      _id: _id,
      name: currentStatus,
      date: lastUpdatedOn,
    });
    setEditStatusShow(true);
  };
  const handleShowStatusDetails = (module) => {
    setModuleDetails(module);
    setShowStatusDetails(true);
  };

  return (
    <div className="col-12">
      <EditStatus
        show={editStatusShow}
        setShowEditStatus={handleClose}
        setStatusInfo={setStatusInfo}
        statusInfo={statusInfo}
        setCurrentInfo={setCurrentInfo}
        currentInfo={currentInfo}
        update={true}
      />
      <StatusDetails
        module={moduleDetails}
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
            <Button
              onClick={() => {
                dispatch(logout());
              }}
              sx={{ color: "white" }}
              endIcon={<Logout />}
            >
              Logout
            </Button>
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
            allbatches={batch}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
          />
        </div>

        <div className="d-none d-lg-flex justify-content-between mt-3 gap-3">
          <LecturerDashboardSmallCard
            title="Lectures Ongoing"
            count={cardData.lecturers_ongoing}
          />
          <LecturerDashboardSmallCard
            title="Exams Mngoing"
            count={cardData.exams_ongoing}
          />
          <LecturerDashboardSmallCard
            title="Paper Marking"
            count={cardData.paper_marking_one}
          />
          <LecturerDashboardSmallCard
            title="Paper Marking II"
            count={cardData.paper_marking_two}
          />
          <LecturerDashboardSmallCard
            title="Results Released"
            count={cardData.results_released}
          />
        </div>
        {selectedBatch.length === 0 &&
          batch.map((batch, index) => {
            let module = filteredAllocations.filter(
              (module) => module.batch === batch
            );
            return <CoursesView key={index} title={batch} modules={module} />;
          })}
        {selectedBatch.length > 0 ? (
          <CoursesView
            title={selectedBatch}
            modules={filteredAllocations.filter(
              (module) => module.batch === selectedBatch
            )}
          />
        ) : null}
      </div>
    </div>
  );
}

export default DashboardLecturer;

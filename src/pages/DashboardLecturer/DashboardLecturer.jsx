import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

function DashboardLecturer({ setNavbar }) {
  const lectureId = useSelector((state) => state.loginMMS.lectureId);
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
    console.log(allocations);
    console.log(batch);
  }, [allocations, batch]);

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
                console.log("one module", oneModule._id);
                return (
                  <ModuleCard
                    key={index}
                    {...oneModule.module}
                    allocationId={oneModule._id}
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

  const handleClose = () => setEditStatusShow(false);
  const handleCloseStatusDetails = () => setShowStatusDetails(false);
  const handleShowEditStatus = (_id, currentStatus, lastUpdatedOn) => {
    setStatusInfo({
      _id: _id,
      currentStatus: currentStatus,
      lastUpdatedOn: lastUpdatedOn,
    });
    setEditStatusShow(true);
  };
  const handleShowStatusDetails = () => setShowStatusDetails(true);

  return (
    <div className="col-12">
      <EditStatus
        show={editStatusShow}
        setShowEditStatus={handleClose}
        setStatusInfo={setStatusInfo}
        statusInfo={statusInfo}
        update={true}
      />
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
            allbatches={batch}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
          />
        </div>

        <div className="d-flex justify-content-between mt-3 ">
          <LecturerDashboardSmallCard count="27" />
          <LecturerDashboardSmallCard title="Exams ongoing" count="10" />
          <LecturerDashboardSmallCard title="Paper marking" count="10" />
          <LecturerDashboardSmallCard title="Pending Results" count="05" />
          <LecturerDashboardSmallCard title="Lectures ongoing" count="02" />
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

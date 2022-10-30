import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { isAllocated, newAllocation } from "../../App/AllocationsServices";
import { getAllLecturers } from "../../App/LecturerServices";
import { getAllModules } from "../../App/ModuleServices";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import EditStatus from "../../components/EditStatus/EditStatus";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import { useNavigate } from "react-router-dom";

const AllocationsView = ({ setNavbar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavbar("Allocations");
  });
  const [batch, setBatch] = useState("");

  const [allLecturers, setAllLecturers] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({});
  const [selectedLecturers, setSelectedLecturers] = useState([]);
  const [selectedSecondExaminer, setSelectedSecondExaminer] = useState([]);
  const [selectedDemonstrators, setSelectedDemonstrators] = useState([]);
  const [statusInfo, setStatusInfo] = useState({
    name: "Set State",
    date: "",
  });

  const onSuccessGetAllLecturers = (data) => {
    setAllLecturers(data.lecturers);
  };

  const onSuccessGetAllModules = (data) => {
    setAllModules(data.modules);
  };

  const onSuccessAllocation = () => {
    alert("Allocation success");
  };

  const onClickSaveUpdate = () => {
    //TODO: validate all data before sending
    //make the object
    const reqBody = {
      lecturers: selectedLecturers.map((lecturer) => ({
        lecturer: lecturer._id,
        workload: lecturer.workload,
      })),
      module: selectedModule._id,
      state: {
        name: "Ongoing",
        date: "2022-10-21",
      },
      batch: batch,
      secondExaminar: selectedSecondExaminer[0]._id,
      demonstrators: selectedDemonstrators.map(
        (demonstrator) => demonstrator._id
      ),
    };

    //check whether already allocated

    isAllocated({ moduleId: selectedModule._id, batch: batch }, (data) => {
      if (data.message === "ALLOCATED") {
        alert("allocated already");
      } else {
        newAllocation(reqBody, onSuccessAllocation);
      }
    });
  };
  useEffect(() => {
    //set all lecturers on load
    getAllLecturers(onSuccessGetAllLecturers);
    //set all modules on load
    getAllModules(onSuccessGetAllModules);
  }, []);

  const [showEditStatus, setShowEditStatus] = useState(false);

  return (
    <div className="ps-3 pt-3">
      <EditStatus
        show={showEditStatus}
        setShowEditStatus={setShowEditStatus}
        statusInfo={statusInfo}
        setStatusInfo={setStatusInfo}
      />
      {/* course details section */}
      <div className="d-flex">
        <div className="col-3">
          {/* course details goes here */}
          <div className="py-2 fw-semibold fs-5 pe-3">Code</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Name</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Semester</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Credits</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Level</div>
        </div>

        <div className="col-4">
          <div className="py-2 fs-5 d-flex col-12">
            :
            <Autocomplete
              freeSolo
              sx={{ ml: 0.5 }}
              fullWidth
              options={allModules.map(
                (option) => option.moduleCode + " - " + option.moduleName
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size={"small"}
                  fullWidth
                  InputLabelProps={{ shrink: false }}
                  label=" "
                  onBlur={(event) => {
                    setSelectedModule(
                      allModules.filter(
                        (module) =>
                          module.moduleCode + " - " + module.moduleName ===
                          event.target.value
                      )[0]
                    );
                  }}
                  sx={{ borderWidth: 1 }}
                />
              )}
            />
            <Button
              variant="contained"
              color="success"
              className="mx-2 fw-semibold"
            >
              GO
            </Button>
          </div>
          <div className="py-2 fs-5">: {selectedModule.moduleName}</div>
          <div className="py-2 fs-5">
            : {selectedModule.semester}nd Semester
          </div>
          <div className="py-2 fs-5">: 0{selectedModule.credits} Credits</div>
          <div className="py-2 fs-5">: Level 0{selectedModule.level}</div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <TextField
              sx={{ width: "10rem", mr: 1 }}
              placeholder="IM 2018"
              size="small"
              value={batch}
              onChange={(event) => {
                setBatch(event.target.value);
              }}
            ></TextField>
            <StatusBadge
              title={statusInfo.name}
              onClick={() => {
                setShowEditStatus(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* */}
      <div className="d-flex gap-2 mt-3">
        <div className="pt-3 col">
          <AutoComplete
            dataset={allLecturers}
            selected={selectedLecturers}
            setSelected={setSelectedLecturers}
            title={"Lectures"}
          />
          {selectedLecturers.map((lecturer) => {
            return (
              <>
                <label className="mt-3">
                  {lecturer.name} - Workload(Weeks)
                </label>
                <input
                  type="number"
                  placeholder="5"
                  className="form-control mt-1 "
                  onChange={(event) => {
                    lecturer.workload = Number(event.target.value);
                    console.log(selectedLecturers);
                  }}
                />
              </>
            );
          })}
        </div>

        <div className=" pt-3 col">
          <AutoComplete
            dataset={allLecturers}
            selected={selectedSecondExaminer}
            setSelected={setSelectedSecondExaminer}
            title={"2nd Examiner"}
          />
        </div>
        <div className="pt-3 col">
          <AutoComplete
            dataset={allLecturers}
            selected={selectedDemonstrators}
            setSelected={setSelectedDemonstrators}
            title={"Demonstrators"}
          />
        </div>
      </div>
      <div
        className="position-absolute"
        style={{ bottom: "15px", right: "35px" }}
      >
        <Button
          variant="contained"
          className=" me-3 px-4"
          onClick={() => {
            navigate("/allocations");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          className="px-3"
          onClick={onClickSaveUpdate}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default AllocationsView;

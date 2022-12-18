import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  isAllocated,
  newAllocation,
  updateAllocation,
} from "../../App/AllocationsServices";
import { getAllLecturers } from "../../App/LecturerServices";
import { getAllModules } from "../../App/ModuleServices";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import EditStatus from "../../components/EditStatus/EditStatus";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showAlert } from "../../reducers/alertSlice";
import DetailedView from "../../components/DetailedView/DetailedView";
import ErrorDetails from "../../components/ErrorDetails/ErrorDetails";

const AllocationsView = ({ setNavbar }) => {
  const location = useLocation();

  const [allocationToUpdate, setAllocationToUpdate] = useState(location.state);
  console.log(allocationToUpdate);
  const navigate = useNavigate();
  useEffect(() => {
    setNavbar("Allocations");
  });
  const [batch, setBatch] = useState("");

  const [allLecturers, setAllLecturers] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({});
  const [selectedLecturers, setSelectedLecturers] = useState([]);
  const [lecturersToUpdate, setLecturersToUpdate] = useState(
    allocationToUpdate?.lecturers
      ? allocationToUpdate.lecturers.map((lecturer) => ({
          ...lecturer.lecturer,
          workload: lecturer.workload,
        }))
      : []
  );
  const [lecturerObjectToSave, setLecturersObjectToSave] = useState([]);
  const [secondExaminerToUpdate, setSecondExaminerToUpdate] = useState(
    allocationToUpdate?.secondExaminar
      ? [allocationToUpdate.secondExaminar]
      : []
  );
  const [demonstratorsToUpdate, setDemonstratorsToUpdate] = useState(
    allocationToUpdate?.demonstrators ? allocationToUpdate.demonstrators : []
  );
  const [selectedSecondExaminer, setSelectedSecondExaminer] = useState([]);
  const [selectedDemonstrators, setSelectedDemonstrators] = useState([]);
  const [statusInfo, setStatusInfo] = useState(
    allocationToUpdate?.state
      ? { ...allocationToUpdate.state[allocationToUpdate.state.length - 1] }
      : {
          name: "Set State",
          date: "",
        }
  );
  const [currentInfo, setCurrentInfo] = useState(
    allocationToUpdate?.state
      ? {
          ...allocationToUpdate.state[allocationToUpdate.state.length - 1],
          _id: allocationToUpdate?._id,
        }
      : {
          name: "Set State",
          date: "",
        }
  );
  const dispatcher = useDispatch();

  // validations
  const [invalidModule, setInvalidModule] = useState();

  const [validation, setValidation] = useState({
    //error states 0 - initial view 1-error 2-valid
    batchName: { visibility: 0, message: "" },
    lecturers: { visibility: 0, message: "" },
    demonstrators: { visibility: 0, message: "" },
    secondExaminer: { visibility: 0, message: "" },
    state: {
      name: { visibility: 0, message: "" },
      date: { visibility: 0, message: "" },
    },
  });

  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // validations

  useEffect(() => {
    selectedLecturers.map((selected) => {
      //check whether the lecturer is not exists in the current list
      let isNotExist = lecturerObjectToSave.filter(
        (object) => object.lecturer._id === selected._id
      );
      console.log(isNotExist);
      if (isNotExist) {
        setLecturersObjectToSave([
          ...lecturerObjectToSave,
          { lecturer: selected, workload: "" },
        ]);
      }
    });
  }, [selectedLecturers]);

  useEffect(() => {
    console.log("LecturerObj:", lecturerObjectToSave);
  }, [lecturerObjectToSave]);

  const onSuccessGetAllLecturers = (data) => {
    setAllLecturers(data.lecturers);
  };

  const onSuccessGetAllModules = (data) => {
    setAllModules(data.modules);
  };

  const onSuccessAllocation = () => {
    // alert("Allocation success");
    if (allocationToUpdate) {
      dispatcher(
        showAlert({
          isVisible: true,
          message: "Allocation details updated",
          btnText: "",
          btnAction: () => {},
        })
      );
    } else {
      dispatcher(
        showAlert({
          isVisible: true,
          message: "New allocation created",
          btnText: "",
          btnAction: () => {},
        })
      );
    }

    navigate("/allocations");
  };

  const onClickSaveUpdate = () => {
    //make the object
    if (
      validateAll(
        selectedLecturers,
        selectedSecondExaminer,
        selectedDemonstrators,
        statusInfo
      )
    ) {
      const reqBody = {
        ...(allocationToUpdate && { _id: allocationToUpdate._id }),
        lecturers: selectedLecturers.map((lecturer) => ({
          lecturer: lecturer._id,
          workload: lecturer.workload,
        })),
        state: statusInfo,
        module: selectedModule?._id,
        batch: batch,
        secondExaminar: selectedSecondExaminer[0]._id,
        demonstrators: selectedDemonstrators.map(
          (demonstrator) => demonstrator._id
        ),
      };

      if (allocationToUpdate) {
        console.log("Updating");
        updateAllocation(reqBody, onSuccessAllocation);
      } else {
        isAllocated({ moduleId: selectedModule?._id, batch: batch }, (data) => {
          console.log(data);
          if (data.isAllocated === "ALLOCATED") {
            dispatcher(
              showAlert({
                isVisible: true,
                message: `This module has a previous allocation for ${batch} batch`,
                btnText: "",
                btnAction: () => {},
              })
            );
          } else {
            newAllocation(reqBody, onSuccessAllocation);
          }
        });
      }
    }
  };

  // useEffect(() => {
  //   //shows validatoion errors

  //   if (
  //     validation.lecturers.visibility === 1 ||
  //     validation.secondExaminer.visibility === 1 ||
  //     validation.demonstrators.visibility === 1 ||
  //     validation.state.name.visibility === 1 ||
  //     validation.state.date.visibility === 1
  //   ) {
  //     //FIXME:something is wrong with the validations
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showValidationErrors]);

  useEffect(() => {
    //set all lecturers on load
    getAllLecturers(onSuccessGetAllLecturers);
    //set all modules on load
    getAllModules(onSuccessGetAllModules);
    if (allocationToUpdate) {
      setSelectedModule(allocationToUpdate?.module);
      setBatch(allocationToUpdate?.batch);
      setStatusInfo({
        _id: allocationToUpdate ? allocationToUpdate._id : "",
        name: allocationToUpdate
          ? allocationToUpdate.state[allocationToUpdate?.state.length - 1].name
          : "",
        date: allocationToUpdate
          ? allocationToUpdate.state[allocationToUpdate?.state.length - 1].date
          : "",
      });
    }
  }, []);

  const [showEditStatus, setShowEditStatus] = useState(false);

  const validateBatch = (batchName = "") => {
    if (batchName.length > 0) {
      if (batchName.match(/^IM\s[0-9]{4,4}$/)) {
        setValidation((prev) => ({
          ...prev,
          batchName: { visibility: 2, message: "" },
        }));
        return true;
      } else {
        setValidation((prev) => ({
          ...prev,
          batchName: {
            visibility: 1,
            message: "Please use format Eg: IM 2019",
          },
        }));
        return false;
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        batchName: { visibility: 1, message: "Batch name is required" },
      }));
      return false;
    }
  };

  const validateAll = (
    lecturers = [],
    secondExaminar = [],
    demonstrator = [],
    state = {}
  ) => {
    console.log(lecturers.length, secondExaminar, demonstrator);
    let allCorrect = true;
    if (lecturers.length > 0) {
      if (
        lecturers.filter(
          (lecturer) =>
            !lecturer.hasOwnProperty("workload") ||
            (lecturer.hasOwnProperty("workload") &&
              lecturer.workload.length === 0)
        ).length > 0
      ) {
        allCorrect = false;
        setValidation((prev) => ({
          ...prev,
          lecturers: {
            visibility: 1,
            message: "Please set workload for all lecturers",
          },
        }));
      } else {
        setValidation((prev) => ({
          ...prev,
          lecturers: {
            visibility: 0,
            message: "",
          },
        }));
      }
    } else {
      allCorrect = false;
      setValidation((prev) => ({
        ...prev,
        lecturers: {
          visibility: 1,
          message: "Please select at least one lecturer",
        },
      }));
    }
    if (secondExaminar.length > 0) {
      setValidation((prev) => ({
        ...prev,
        secondExaminer: {
          visibility: 0,
          message: "",
        },
      }));
    } else {
      allCorrect = false;
      setValidation((prev) => ({
        ...prev,
        secondExaminer: {
          visibility: 1,
          message: "Please select the second examinor",
        },
      }));
    }
    // if (demonstrator.length > 0) {
    //   setValidation((prev) => ({
    //     ...prev,
    //     demonstrators: {
    //       visibility: 0,
    //       message: "",
    //     },
    //   }));
    // } else {
    //   allCorrect = false;
    //   setValidation((prev) => ({
    //     ...prev,
    //     demonstrators: {
    //       visibility: 1,
    //       message: "Please select at least one demonstrator",
    //     },
    //   }));
    // }

    if (state.name !== "Set State") {
      setValidation((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          name: {
            visibility: 0,
            message: "",
          },
        },
      }));
    } else {
      allCorrect = false;
      setValidation((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          name: {
            visibility: 1,
            message: "Please set the state",
          },
        },
      }));
    }
    if (new Date(state.date) !== "Invalid Date" && state.date.length > 0) {
      setValidation((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          date: {
            visibility: 0,
            message: "",
          },
        },
      }));
    } else {
      allCorrect = false;
      setValidation((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          date: {
            visibility: 1,
            message: "Please set the date of state",
          },
        },
      }));
    }
    if (!validateBatch(batch)) {
      allCorrect = false;
    }
    console.log(selectedModule);
    if (!selectedModule._id?.length > 0) {
      allCorrect = false;
      setInvalidModule(true);
    }

    if (!allCorrect) {
      dispatcher(
        showAlert({
          isVisible: true,
          message: `Some fields have incorrect information`,
          btnText: "",
          btnAction: () => {},
        })
      );
    }

    setShowValidationErrors((prev) => !prev);
    return allCorrect;
  };

  console.log("Status info:", statusInfo);
  return (
    <div className="ps-3 pt-3">
      <EditStatus
        show={showEditStatus}
        setShowEditStatus={setShowEditStatus}
        statusInfo={statusInfo}
        currentInfo={currentInfo}
        setCurrentInfo={setCurrentInfo}
        setStatusInfo={setStatusInfo}
        {...(allocationToUpdate && { update: true })}
      />
      {/* 
      <DetailedView
        showDetailedView={showDetailedView}
        setShowDetailedView={setShowDetailedView}
      >
        <div className=" mb-3" style={{ fontSize: "1.2rem", fontWeight: 600 }}>
          Following fields are having incorrect data
        </div>
        {validation.lecturers.visibility !== 0 && (
          <ErrorDetails
            title="Lecturers"
            message={validation.lecturers.message}
          />
        )}
        {validation.secondExaminer.visibility !== 0 && (
          <ErrorDetails
            title="Second Examinor"
            message={validation.secondExaminer.message}
          />
        )}
        {validation.demonstrators.visibility !== 0 && (
          <ErrorDetails
            title="Demonstrators"
            message={validation.demonstrators.message}
          />
        )}
        {validation.state.name.visibility !== 0 && (
          <ErrorDetails
            title="State Name"
            message={validation.state.name.message}
          />
        )}
        {validation.state.date.visibility !== 0 && (
          <ErrorDetails
            title="State Date"
            message={validation.state.name.message}
          />
        )}
      </DetailedView> */}
      {/* course details section */}
      <div className="d-flex">
        <div className="col-7">
          <div className="d-flex">
            <div className="col-3 py-2 fw-semibold fs-5 pe-3">Code</div>
            <div className="py-2 fs-5 d-flex col-8 align-items-start">
              :
              <Autocomplete
                freeSolo
                sx={{ ml: 0.5 }}
                fullWidth
                options={allModules.map(
                  (option) => option.moduleCode + " - " + option.moduleName
                )}
                {...(allocationToUpdate && { disabled: true })}
                renderInput={(params) => (
                  <TextField
                    {...{
                      ...params,
                      ...(allocationToUpdate && {
                        inputProps: {
                          ...params.inputProps,
                          value:
                            selectedModule?.moduleCode +
                            " - " +
                            selectedModule?.moduleName,
                        },
                      }),
                    }}
                    size={"small"}
                    fullWidth
                    InputLabelProps={{ shrink: false }}
                    label=" "
                    {...(invalidModule && {
                      error: true,
                      helperText: "Please select a module",
                    })}
                    onBlur={(event) => {
                      if (event.target.value.length > 0) {
                        setInvalidModule(false);
                        setSelectedModule(
                          allModules.filter(
                            (module) =>
                              module.moduleCode + " - " + module.moduleName ===
                              event.target.value
                          )[0]
                        );
                      } else {
                        setInvalidModule(true);
                      }
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
          </div>
          <div className="d-flex">
            <div className="py-2 col-3 fw-semibold fs-5 pe-3">Name</div>
            <div className="py-2 fs-5">: {selectedModule?.moduleName}</div>
          </div>
          <div className="d-flex">
            <div className="py-2 col-3 fw-semibold fs-5 pe-3">Semester</div>
            <div className="py-2 fs-5">
              :{" "}
              {selectedModule?.semester === "1"
                ? `${selectedModule?.semester} st Semester`
                : null}
              {selectedModule?.semester === "2"
                ? `${selectedModule?.semester} nd Semester`
                : null}
            </div>
          </div>

          <div className="d-flex">
            <div className="py-2 col-3 fw-semibold fs-5 pe-3">Credits</div>
            <div className="py-2 fs-5">
              :{" "}
              {selectedModule?.credits
                ? `0${selectedModule?.credits} Credits`
                : ""}
            </div>
          </div>
          <div className="d-flex">
            <div className="py-2 col-3 fw-semibold fs-5 pe-3">Level</div>
            <div className="py-2 fs-5">
              : {selectedModule?.level ? `Level 0${selectedModule?.level}` : ""}
            </div>
          </div>
        </div>

        <div className="col">
          <div className="d-flex justify-content-end align-items-start">
            <div className="me-2">
              <Form.Control
                style={{ width: "12rem" }}
                value={batch}
                placeholder="IM 2018"
                onChange={(event) => {
                  validateBatch(event.target.value);
                  setBatch(event.target.value);
                }}
                type="text"
                {...(validation.batchName.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.batchName.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.batchName.message}
              </Form.Control.Feedback>
            </div>
            <StatusBadge
              title={statusInfo.name.split("_").join("  ").toLowerCase()}
              isInvalid={
                validation.state.name.visibility !== 0 ||
                validation.state.date.visibility !== 0
              }
              onClick={() => {
                setShowEditStatus(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* */}
      <div className="d-flex gap-2 mt-3">
        <div className="pt-3 col ">
          <AutoComplete
            dataset={allLecturers}
            selected={selectedLecturers}
            setSelected={setSelectedLecturers}
            defaultValues={lecturersToUpdate}
            title={
              validation.lecturers.visibility !== 0 ? (
                <div>
                  Lecturers
                  <span
                    className="text-danger ps-2"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {validation.lecturers.message}
                  </span>
                </div>
              ) : (
                "Lecturers"
              )
            }
          />
          {console.log(selectedLecturers)}
          {selectedLecturers.map((lecturer) => {
            return (
              <>
                <label className="mt-3">
                  {lecturer?.name} - Workload(Weeks)
                </label>
                <input
                  type="number"
                  placeholder="5"
                  className="form-control mt-1 "
                  value={lecturer.workload ? lecturer.workload : ""}
                  onChange={(event) => {
                    setSelectedLecturers((prev) =>
                      prev.map((setWorkload) => {
                        if (setWorkload._id === lecturer._id) {
                          setWorkload.workload = event.target.value;
                        }
                        return setWorkload;
                      })
                    );
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
            title={
              validation.secondExaminer.visibility !== 0 ? (
                <div>
                  2nd Examiner
                  <span
                    className="text-danger ps-2"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {validation.secondExaminer.message}
                  </span>
                </div>
              ) : (
                "2nd Examiner"
              )
            }
            defaultValues={secondExaminerToUpdate}
          />
        </div>
        <div className="pt-3 col">
          <AutoComplete
            dataset={allLecturers}
            selected={selectedDemonstrators}
            setSelected={setSelectedDemonstrators}
            title={
              validation.demonstrators.visibility !== 0 ? (
                <div>
                  Demonstrators
                  <span
                    className="text-danger ps-2 text-nowrap"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {validation.demonstrators.message}
                  </span>
                </div>
              ) : (
                "Demonstrators"
              )
            }
            defaultValues={demonstratorsToUpdate}
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
          {allocationToUpdate ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default AllocationsView;

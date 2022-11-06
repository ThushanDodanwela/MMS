import { Add } from "@mui/icons-material";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getAllModules,
  isModuleExists,
  newModule,
  updateModule,
} from "../../App/ModuleServices";
import CustomButton from "../../components/CustomButton/CustomButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { LEVELS, SEMESTER } from "../../const";
import { showAlert } from "../../reducers/alertSlice";

const Module = ({ setNavbar }) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name = "") {
    const derivedName = name.substring(0, 2);
    return {
      sx: {
        bgcolor: stringToColor(derivedName),
      },
      children: `${derivedName}`,
    };
  }
  const [validation, setValidation] = useState({
    //error states 0 - initial view 1-error 2-valid
    moduleCode: { visibility: 0, message: "" },
    moduleName: { visibility: 0, message: "" },
    credits: { visibility: 0, message: "" },
    level: { visibility: 0, message: "" },
    semester: { visibility: 0, message: "" },
  });

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("NONE");

  // const [rowsRetrived, setRowsRetrived] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [shoudRefresh, setShoudRefresh] = useState(false);

  const [retrivedModules, setRetrivedModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const dispatcher = useDispatch();

  const onSuccessRetrive = (data) => {
    setRetrivedModules(data.modules);
  };

  // Data retriving
  useEffect(() => {
    getAllModules(onSuccessRetrive);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoudRefresh]);
  useEffect(() => {
    if (searchKeyword.length > 0) {
      let keyword = searchKeyword.toLowerCase();
      setFilteredModules(
        retrivedModules.filter(
          (module) =>
            module.moduleName.toLowerCase().match(keyword) ||
            module.moduleCode.toLowerCase().match(keyword)
        )
      );
    } else {
      setFilteredModules(retrivedModules.slice(0, 5));
    }
  }, [searchKeyword, retrivedModules, filterBy]);
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setNavbar("Modules");
  });

  const [moduleInfo, setModuleInfo] = useState({
    moduleCode: "",
    moduleName: "",
    level: "",
    credits: "",
    semester: "",
  });

  const onSuccessSaveUpdate = () => {
    setModuleInfo({
      moduleCode: "",
      moduleName: "",
      level: "",
      credits: "",
      semester: "",
    });
    handleClose();
    if (isUpdating) {
      dispatcher(
        showAlert({
          isVisible: true,
          message: "Module details updated",
          btnText: "",
          btnAction: () => {},
        })
      );
    } else {
      dispatcher(
        showAlert({
          isVisible: true,
          message: "Module details saved",
          btnText: "",
          btnAction: () => {},
        })
      );
    }
    setIsUpdating(false);
    setShoudRefresh((prev) => !prev);
  };

  const handleUpdate = () => {
    if (
      validation.moduleCode.visibility === 2 &&
      validation.moduleName.visibility === 2 &&
      validation.credits.visibility === 2 &&
      validation.level.visibility === 2 &&
      validation.semester.visibility === 2
    ) {
      updateModule(moduleInfo, onSuccessSaveUpdate);
    }
  };

  const handleEditClick = (module) => {
    setValidation({
      moduleCode: { visibility: 2, message: "" },
      moduleName: { visibility: 2, message: "" },
      credits: { visibility: 2, message: "" },
      level: { visibility: 2, message: "" },
      semester: { visibility: 2, message: "" },
    });
    setIsUpdating(true);
    setModuleInfo({ ...module });
    setShow(true);
  };

  const handleSave = () => {
    if (
      validation.moduleCode.visibility === 2 &&
      validation.moduleName.visibility === 2 &&
      validation.credits.visibility === 2 &&
      validation.level.visibility === 2 &&
      validation.semester.visibility === 2
    ) {
      newModule(moduleInfo, onSuccessSaveUpdate);
    }
  };

  // ---------------------------------validation ------------------------------------------
  const validateModuleName = (moduleName) => {
    if (moduleName.length > 0) {
      setValidation((prev) => ({
        ...prev,
        moduleName: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        moduleName: { visibility: 1, message: "Module Name name is required" },
      }));
      return false;
    }
  };

  const validateModuleCode = (moduleCode) => {
    if (moduleCode.length > 0) {
      if (moduleCode.match(/^[A-Z]{4,4}\s[0-9]{5,5}$/)) {
        setValidation((prev) => ({
          ...prev,
          moduleCode: { visibility: 2, message: "" },
        }));
        return true;
      } else {
        setValidation((prev) => ({
          ...prev,
          moduleCode: {
            visibility: 1,
            message: "Module code fromat is wrong. Eg: MGTE 45875",
          },
        }));
        return false;
      }
    } else {
      setValidation((prev) => ({
        ...prev,
        moduleCode: {
          visibility: 1,
          message: "Module code is required",
        },
      }));
      return false;
    }
  };

  const setLevelAndSemester = () => {
    const moduleCode = moduleInfo.moduleCode;
    console.log(moduleCode);
    setModuleInfo({
      ...moduleInfo,
      level: moduleCode.split(" ")[1].substring(0, 1),
      semester: moduleCode.split(" ")[1].substring(5, 4),
    });
  };

  const validateCredits = (credits) => {
    //send request and check whether it exists
    if (credits.length > 0) {
      setValidation((prev) => ({
        ...prev,
        credits: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        credits: {
          visibility: 1,
          message: "Number of credits is required",
        },
      }));
      return false;
    }
  };

  const validateIsModuleCodeExists = (moduleCode) => {
    if (validateModuleCode(moduleCode)) {
      return isModuleExists(
        { moduleCode: moduleCode },
        function onSuccess(data) {
          setValidation((prev) => ({
            ...prev,
            moduleCode: { visibility: 2, message: "" },
          }));
          return true;
        },
        function onFailed(data) {
          setValidation((prev) => ({
            ...prev,
            moduleCode: { visibility: 1, message: data },
          }));
          return false;
        }
      );
    }
  };

  const validateLevel = (level) => {
    if (level !== "NONE") {
      setValidation((prev) => ({
        ...prev,
        level: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        level: {
          visibility: 1,
          message: "Level is required",
        },
      }));
      return false;
    }
  };

  const validateSemester = (semester) => {
    if (semester !== "NONE") {
      setValidation((prev) => ({
        ...prev,
        semester: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        semester: {
          visibility: 1,
          message: "Semester is required",
        },
      }));
      return false;
    }
  };
  // ---------------------------------validation ------------------------------------------

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Module Code</Form.Label>
              <Form.Control
                value={moduleInfo.moduleCode}
                onBlur={(event) => {
                  if (validateIsModuleCodeExists(event.target.value)) {
                  }
                  setLevelAndSemester();
                }}
                onChange={(event) => {
                  validateModuleCode(event.target.value);
                  setModuleInfo({
                    ...moduleInfo,
                    moduleCode: event.target.value,
                  });
                }}
                type="text"
                placeholder="INTE12212"
                {...(validation.moduleCode.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.moduleCode.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.moduleCode.message}
              </Form.Control.Feedback>
              <Form.Label className="pt-3">Module Name</Form.Label>
              <Form.Control
                value={moduleInfo.moduleName}
                onChange={(event) => {
                  validateModuleName(event.target.value);
                  setModuleInfo({
                    ...moduleInfo,
                    moduleName: event.target.value,
                  });
                }}
                type="text"
                placeholder="Programming Concepts"
                {...(validation.moduleName.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.moduleName.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.moduleName.message}
              </Form.Control.Feedback>
              <Form.Label className="pt-3">Credits</Form.Label>
              <Form.Control
                value={moduleInfo.credits}
                onChange={(event) => {
                  validateCredits(event.target.value);
                  setModuleInfo({
                    ...moduleInfo,
                    credits: event.target.value,
                  });
                }}
                type="text"
                placeholder="3"
                {...(validation.credits.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.credits.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.credits.message}
              </Form.Control.Feedback>
              <div className="d-flex">
                <div className="col pe-2 pt-3">
                  <Form.Label className="">Level</Form.Label>
                  <Form.Select
                    value={moduleInfo.level}
                    onChange={(event) => {
                      validateLevel(event.target.value);
                      setModuleInfo({
                        ...moduleInfo,
                        level: event.target.value,
                      });
                    }}
                    {...(validation.level.visibility === 1 && {
                      isInvalid: true,
                    })}
                    {...(validation.level.visibility === 2 && {
                      isValid: true,
                    })}
                  >
                    {LEVELS.map((level, index) => {
                      return (
                        <option key={index} value={level.value}>
                          {level.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validation.level.message}
                  </Form.Control.Feedback>
                </div>
                <div className="col ps-2 pt-3">
                  <Form.Label className="">Semester</Form.Label>
                  <Form.Select
                    value={moduleInfo.semester}
                    onChange={(event) => {
                      validateSemester(event.target.value);
                      setModuleInfo({
                        ...moduleInfo,
                        semester: event.target.value,
                      });
                    }}
                    {...(validation.semester.visibility === 1 && {
                      isInvalid: true,
                    })}
                    {...(validation.semester.visibility === 2 && {
                      isValid: true,
                    })}
                  >
                    {SEMESTER.map((semester, index) => {
                      return (
                        <option key={index} value={semester.value}>
                          {semester.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validation.semester.message}
                  </Form.Control.Feedback>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="bg-secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            className="bg-success"
            onClick={isUpdating ? handleUpdate : handleSave}
          >
            {isUpdating ? " Update " : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="px-3 pb-5 mb-5">
        <TableContainer
          component={Paper}
          sx={{ pt: 1, mt: 2 }}
          elevation={1}
          className="px-2"
        >
          <div className=" py-2 d-flex ">
            <div className="col-6 ps-1 fs-5 fw-bold d-flex justify-content-start align-items-center">
              All Modules
              <Chip
                title={
                  "Showing only 5 modules. Search by module code or module name for other modules"
                }
                label={`Showing ${filteredModules.length} of ${retrivedModules.length} modules`}
                size="small"
                sx={{
                  ml: { xs: 0, lg: 1 },
                  mr: { xs: 3, lg: 0 },
                  marginY: { xs: 1, lg: 0 },
                  fontWeight: "bold",
                  backgroundColor: "#198754;",
                  color: "white",
                }}
              />
            </div>
            <div className="col-5 pe-1">
              <SearchBar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                hideFilter={true}
              />
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <CustomButton
                variant="contained"
                size="small"
                color="success"
                endIcon={<Add />}
                onClick={() => {
                  setValidation({
                    moduleCode: { visibility: 0, message: "" },
                    moduleName: { visibility: 0, message: "" },
                    credits: { visibility: 0, message: "" },
                    level: { visibility: 0, message: "" },
                    semester: { visibility: 0, message: "" },
                  });
                  setModuleInfo({
                    moduleCode: "",
                    moduleName: "",
                    level: "",
                    credits: "",
                    semester: "",
                  });
                  setShow(true);
                }}
                sx={{ paddingY: 1.2, fontWeight: "bold" }}
              >
                ADD
              </CustomButton>
            </div>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#E6E6E6",
              }}
            >
              <TableRow>
                <TableCell className="fw-bold py-3">Module Code</TableCell>
                <TableCell className="fw-bold"> Module Name</TableCell>
                <TableCell className="fw-bold" align="center">
                  Level
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Credits
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Semester
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredModules.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="py-3" component="th" scope="row">
                    <div className="d-flex  gap-3">
                      <Col>
                        <div className="d-flex align-items-center" key={index}>
                          <Avatar {...stringAvatar(row?.moduleCode)} />
                          <div className="ps-2">
                            <p className="fw-semibold mb-1 ">
                              {row?.moduleCode}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-2">{row.moduleName}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1  text-center">Level {row?.level}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1  text-center">
                        0{row?.credits} Credits
                      </p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1 text-center">{row.semester}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col align="center">
                      <Button
                        color="secondary"
                        onClick={() => {
                          handleEditClick(row);
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button color="error">Delete</Button> */}
                    </Col>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Module;

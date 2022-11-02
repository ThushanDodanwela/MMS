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
import {
  getAllModules,
  newModule,
  updateModule,
} from "../../App/ModuleServices";
import CustomButton from "../../components/CustomButton/CustomButton";
import SearchBar from "../../components/SearchBar/SearchBar";

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

  // function createData(
  //   module_id,
  //   module_code,
  //   module_name,
  //   level,
  //   credit,
  //   semester
  // ) {
  //   return {
  //     module_id,
  //     module_code,
  //     module_name,
  //     level,
  //     credit,
  //     semester,
  //   };
  // }
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("NONE");

  // const [rowsRetrived, setRowsRetrived] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [shoudRefresh, setShoudRefresh] = useState(false);

  const [retrivedModules, setRetrivedModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);

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
    // if (filterBy !== "NONE") {
    //   console.log("filterign");
    //   setFilteredModules((prev) =>
    //     prev.filter(
    //       (module) => module.state[module.state.length - 1].name === filterBy
    //     )
    //   );
    // }
  }, [searchKeyword, retrivedModules, filterBy]);
  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    "Module Code",
    "Module Name",
    "Level",
    "Credits",
    "Semester",
    "Actions",
  ];

  // const editClickHandler = (moduleId) => {
  //   setIsUpdating(true);
  //   console.log(retrivedModules);
  //   let moduleToEdit = retrivedModules.filter(
  //     (module) => module._id === moduleId
  //   );
  //   setModuleInfo({ ...moduleToEdit[0] });
  //   handleShow();
  // };

  // const rows = [
  //   {
  //     id: "module_code",
  //     numeric: false,
  //     disablePadding: true,
  //     label: "Module Code",
  //     align: "center",
  //   },
  //   {
  //     id: "module_name",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",

  //     label: "Module Name",
  //   },

  //   {
  //     id: "level",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",

  //     label: "Level",
  //   },
  //   {
  //     id: "credit",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",
  //     label: "No of Credits",
  //   },

  //   {
  //     id: "semester",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "Semester",
  //     align: "center",
  //   },

  //   {
  //     id: "action",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "Action",
  //     align: "center",
  //     sorting: false,
  //   },
  // ];

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

  // const onChangeInput = (event) => {
  //   setModuleInfo({
  //     ...moduleInfo,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const onSuccessSaveUpdate = () => {
    setModuleInfo({
      moduleCode: "",
      moduleName: "",
      level: "",
      credits: "",
      semester: "",
    });
    handleClose();
    setIsUpdating(false);
    setShoudRefresh((prev) => !prev);
  };

  const handleUpdate = () => {
    updateModule(moduleInfo, onSuccessSaveUpdate);
  };

  const handleEditClick = (module) => {
    setIsUpdating(true);
    setModuleInfo({ ...module });
    setShow(true);
  };

  const handleSave = () => {
    newModule(moduleInfo, onSuccessSaveUpdate);
  };

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
                onChange={(event) => {
                  setModuleInfo({
                    ...moduleInfo,
                    moduleCode: event.target.value,
                  });
                }}
                type="text"
                placeholder="INTE12212"
              />
              <Form.Label className="pt-3">Module Name</Form.Label>
              <Form.Control
                value={moduleInfo.moduleName}
                onChange={(event) => {
                  setModuleInfo({
                    ...moduleInfo,
                    moduleName: event.target.value,
                  });
                }}
                type="text"
                placeholder="Programming Concepts"
              />
              <Form.Label className="pt-3">Credits</Form.Label>
              <Form.Control
                value={moduleInfo.credits}
                onChange={(event) => {
                  setModuleInfo({
                    ...moduleInfo,
                    credits: event.target.value,
                  });
                }}
                type="text"
                placeholder="3"
              />

              <div className="d-flex">
                <div className="col pe-2 pt-4">
                  <Form.Select
                    value={moduleInfo.level}
                    onChange={(event) => {
                      setModuleInfo({
                        ...moduleInfo,
                        level: event.target.value,
                      });
                    }}
                  >
                    <option value="Select Level">Select Level</option>
                    <option value="1">Level 01</option>
                    <option value="2">Level 02</option>
                    <option value="3">Level 03</option>
                    <option value="4">Level 04</option>
                  </Form.Select>
                </div>
                <div className="col ps-2 pt-4">
                  <Form.Select
                    value={moduleInfo.semester}
                    onChange={(event) => {
                      setModuleInfo({
                        ...moduleInfo,
                        semester: event.target.value,
                      });
                    }}
                  >
                    <option value="Select Semester">Select Semester</option>
                    <option value="1">Semester 01</option>
                    <option value="2">Semester 02</option>
                  </Form.Select>
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
                      <Button color="error">Delete</Button>
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

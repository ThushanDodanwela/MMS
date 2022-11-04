import { Add } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import {
  getAllLecturers,
  newLecturer,
  updateLecturer,
} from "../../App/LecturerServices";
import CustomButton from "../../components/CustomButton/CustomButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import { POSITIONS } from "../../const";

const Lecturer = ({ setNavbar }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [lecturerInfo, setLecturerInfo] = useState({
    name: "",
    position: "",
    email: "",
    phoneNumber: "",
    qualifications: "",
  });

  const [validation, setValidation] = useState({
    //error states 0 - initial view 1-error 2-valid
    name: { visibility: 0, message: "" },
    email: { visibility: 0, message: "" },
    phoneNumber: { visibility: 0, message: "" },
    position: { visibility: 0, message: "" },
    qualifications: { visibility: 0, message: "" },
  });

  const handleShow = () => {
    setLecturerInfo({
      name: "",
      position: "",
      email: "",
      phoneNumber: "",
      qualifications: "",
    });
    setShow(true);
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const [shoudRefresh, setShoudRefresh] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("NONE");

  const [retrivedLectures, setRetrivedLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      let keyword = searchKeyword.toLowerCase();
      setFilteredLecturers(
        retrivedLectures.filter((lecturer) =>
          lecturer.name.toLowerCase().match(keyword)
        )
      );
    } else {
      setFilteredLecturers(retrivedLectures.slice(0, 5));
    }
  }, [searchKeyword, retrivedLectures, filterBy]);

  const editClickHandler = (lecturerId) => {
    setIsUpdating(true);
    console.log(retrivedLectures);
    let lecturerToEdit = retrivedLectures.filter(
      (lecturer) => lecturer._id === lecturerId
    );
    setLecturerInfo({ ...lecturerToEdit[0] });
    setShow(true);
  };

  const onSuccessSaveUpdate = () => {
    setLecturerInfo({
      name: "",
      position: "",
      email: "",
      phoneNumber: "",
      qualifications: "",
    });
    handleClose();
    setIsUpdating(false);
    setShoudRefresh((prev) => !prev);
  };

  const handleUpdate = () => {
    updateLecturer(lecturerInfo, onSuccessSaveUpdate);
  };

  const handleSave = () => {
    newLecturer(lecturerInfo, onSuccessSaveUpdate);
  };

  const onSuccessRetrive = (data) => {
    setRetrivedLecturers(data.lecturers);
  };

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
    const derivedName = name.substring(0, 2).toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(derivedName),
      },
      children: `${derivedName}`,
    };
  }

  // Data retriving
  useEffect(() => {
    getAllLecturers(onSuccessRetrive);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoudRefresh]);

  useEffect(() => {
    setNavbar("Lecturers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------validation ------------------------------------------
  const validateName = (name) => {
    if (name.length > 0) {
      setValidation((prev) => ({
        ...prev,
        name: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        name: { visibility: 1, message: "Lecturer name is required" },
      }));
      return false;
    }
  };

  const validatePoneNumber = (phoneNumber) => {
    if (phoneNumber.length > 0) {
      setValidation((prev) => ({
        ...prev,
        phoneNumber: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        phoneNumber: {
          visibility: 1,
          message: "Phone Number is required",
        },
      }));
      return false;
    }
  };

  const validateEmail = (email) => {
    //send request and check whether it exists
    if (email.length > 0) {
      setValidation((prev) => ({
        ...prev,
        email: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        email: {
          visibility: 1,
          message: "Email is required",
        },
      }));
      return false;
    }
  };

  const validatePosition = (position) => {
    if (position !== "NONE") {
      setValidation((prev) => ({
        ...prev,
        position: { visibility: 2, message: "" },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        position: {
          visibility: 1,
          message: "Position is required",
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
          <Modal.Title>Add New Lecturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Lecturer Name</Form.Label>
              <Form.Control
                value={lecturerInfo.name}
                onChange={(event) => {
                  validateName(event.target.value);
                  setLecturerInfo({
                    ...lecturerInfo,
                    name: event.target.value,
                  });
                }}
                type="text"
                placeholder="Prof. Janaka Wijayanayake"
                {...(validation.name.visibility === 1 && { isInvalid: true })}
                {...(validation.name.visibility === 2 && { isValid: true })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.name.message}
              </Form.Control.Feedback>

              <Form.Label className="pt-3">Position</Form.Label>
              <Form.Select
                value={lecturerInfo.position}
                onChange={(event) => {
                  validatePosition(event.target.value);
                  setLecturerInfo({
                    ...lecturerInfo,
                    position: event.target.value,
                  });
                }}
                {...(validation.position.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.position.visibility === 2 && {
                  isValid: true,
                })}
              >
                {POSITIONS.map((onePosition, index) => {
                  return (
                    <option value={onePosition.value} key={index}>
                      {onePosition.label}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validation.position.message}
              </Form.Control.Feedback>
              <Form.Label className="pt-3">Phone</Form.Label>
              <Form.Control
                value={lecturerInfo.phoneNumber}
                onChange={(event) => {
                  validatePoneNumber(event.target.value);
                  setLecturerInfo({
                    ...lecturerInfo,
                    phoneNumber: event.target.value,
                  });
                }}
                type="text"
                placeholder="+94 (0)11 2914482(ext204)"
                {...(validation.phoneNumber.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.phoneNumber.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.phoneNumber.message}
              </Form.Control.Feedback>
              <Form.Label className="pt-3">Email</Form.Label>
              <Form.Control
                value={lecturerInfo.email}
                onChange={(event) => {
                  validateEmail(event.target.value);
                  setLecturerInfo({
                    ...lecturerInfo,
                    email: event.target.value,
                  });
                }}
                type="text"
                placeholder="janaka@kln.ac.lk"
                {...(validation.email.visibility === 1 && {
                  isInvalid: true,
                })}
                {...(validation.email.visibility === 2 && {
                  isValid: true,
                })}
              />
              <Form.Control.Feedback type="invalid">
                {validation.email.message}
              </Form.Control.Feedback>
              {lecturerInfo.position === "VISITING_LECTURER" && (
                <>
                  <Form.Label className="pt-3">Qualifications</Form.Label>
                  <Form.Control
                    value={lecturerInfo.qualifications}
                    onChange={(event) => {
                      setLecturerInfo({
                        ...lecturerInfo,
                        qualifications: event.target.value,
                      });
                    }}
                    as="textarea"
                    placeholder="ACA MSc"
                    style={{ height: "80px" }}
                  />
                </>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            className="bg-secondary"
            onClick={handleClose}
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={isUpdating ? handleUpdate : handleSave}
          >
            Save Changes
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
              All Lecturers{" "}
              <Chip
                label={`Showing ${filteredLecturers.length} of ${retrivedLectures.length} lecturers`}
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
                onClick={handleShow}
                sx={{ paddingY: 1.2, fontWeight: "bold" }}
              >
                ADD
              </CustomButton>
            </div>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#E6E6E6" }}>
              <TableRow>
                <TableCell className="fw-bold ">Lecturer Name</TableCell>
                <TableCell className="fw-bold"> Position</TableCell>
                <TableCell className="fw-bold" align="center">
                  Phone
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Email
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLecturers.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="d-flex  gap-3">
                      <Col>
                        <div className="d-flex align-items-center" key={index}>
                          <Avatar {...stringAvatar(row?.name)} />
                          <div className="ps-2">
                            <p className="fw-semibold mb-1 ">{row?.name}</p>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1  text-center">{row?.position}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1  text-center">{row?.phoneNumber}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className=" mb-1 text-center">{row.email}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col align="center">
                      <Button
                        color="secondary"
                        onClick={() => {
                          editClickHandler(row._id);
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

export default Lecturer;

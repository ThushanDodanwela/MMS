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

const Lecturer = ({ setNavbar }) => {
  // const [numOfRows, setNumOfRows] = useState(0);
  // const [page, setPage] = useState(0);
  // const [rows, setRows] = useState([]);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [lecturerInfo, setLecturerInfo] = useState({
    name: "",
    position: "",
    email: "",
    phoneNumber: "",
    qualifications: "",
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
    // if (filterBy !== "NONE") {
    //   console.log("filterign");
    //   setFilteredModules((prev) =>
    //     prev.filter(
    //       (module) => module.state[module.state.length - 1].name === filterBy
    //     )
    //   );
    // }
  }, [searchKeyword, retrivedLectures, filterBy]);

  // function createData(_id, name, position, phoneNumber, email) {
  //   return {
  //     _id,
  //     name,
  //     position,
  //     phoneNumber,
  //     email,
  //   };
  // }

  // const headCells = [
  //   {
  //     id: "lec_name",
  //     numeric: false,
  //     disablePadding: true,
  //     label: "Lecturer Name",
  //     align: "center",
  //   },
  //   {
  //     id: "position",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",

  //     label: "Position",
  //   },

  //   {
  //     id: "phone",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",

  //     label: "Phone",
  //   },
  //   {
  //     id: "email",
  //     numeric: true,
  //     disablePadding: false,
  //     align: "center",
  //     label: "Email",
  //   },

  //   {
  //     id: "Actions",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "Actions",
  //     align: "center",
  //     sorting: false,
  //   },
  // ];

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
    // setRows(
    //   data.lecturers.map((lecturer) => {
    //     return createData(
    //       lecturer._id,
    //       lecturer.name,
    //       lecturer.position,
    //       lecturer.phoneNumber,
    //       lecturer.email
    //     );
    //   })
    // );
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
                  setLecturerInfo({
                    ...lecturerInfo,
                    name: event.target.value,
                  });
                }}
                type="text"
                placeholder="Prof. Janaka Wijayanayake"
              />
              <Form.Label className="pt-3">Position</Form.Label>
              <Form.Select
                value={lecturerInfo.position}
                onChange={(event) => {
                  setLecturerInfo({
                    ...lecturerInfo,
                    position: event.target.value,
                  });
                }}
              >
                <option value="PROFESSOR">Professor</option>
                <option value="SENIOR_LECTURER">Senior Lecturer</option>
                <option value="VISITING_LECTURER">Visiting Lecturer</option>
              </Form.Select>

              <Form.Label className="pt-3">Phone</Form.Label>
              <Form.Control
                value={lecturerInfo.phoneNumber}
                onChange={(event) => {
                  setLecturerInfo({
                    ...lecturerInfo,
                    phoneNumber: event.target.value,
                  });
                }}
                type="text"
                placeholder="+94 (0)11 2914482(ext204)"
              />

              <Form.Label className="pt-3">Email</Form.Label>
              <Form.Control
                value={lecturerInfo.email}
                onChange={(event) => {
                  setLecturerInfo({
                    ...lecturerInfo,
                    email: event.target.value,
                  });
                }}
                type="text"
                placeholder="janaka@kln.ac.lk"
              />

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
                <TableCell className="fw-bold">Lecturer Name</TableCell>
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

export default Lecturer;

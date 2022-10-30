import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  getAllLecturers,
  newLecturer,
  updateLecturer,
} from "../../App/LecturerServices";
import EnhancedTable from "../../components/Table/EnhancedTable";

const Lecturer = ({ setNavbar }) => {
  const [numOfRows, setNumOfRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const [retrivedLectures, setRetrivedLecturers] = useState();

  function createData(_id, name, position, phoneNumber, email) {
    return {
      _id,
      name,
      position,
      phoneNumber,
      email,
    };
  }

  const headCells = [
    {
      id: "lec_name",
      numeric: false,
      disablePadding: true,
      label: "Lecturer Name",
      align: "center",
    },
    {
      id: "position",
      numeric: true,
      disablePadding: false,
      align: "center",

      label: "Position",
    },

    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      align: "center",

      label: "Phone",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      align: "center",
      label: "Email",
    },

    {
      id: "Actions",
      numeric: true,
      disablePadding: false,
      label: "Actions",
      align: "center",
      sorting: false,
    },
  ];

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
    setRows(
      data.lecturers.map((lecturer) => {
        return createData(
          lecturer._id,
          lecturer.name,
          lecturer.position,
          lecturer.phoneNumber,
          lecturer.email
        );
      })
    );
  };

  // Data retriving
  useEffect(() => {
    getAllLecturers(onSuccessRetrive);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, shoudRefresh]);

  useEffect(() => {
    setNavbar("Lecturers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="module">
      <div className="listContainer ">
        <div className="table px-4">
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
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={isUpdating ? handleUpdate : handleSave}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="shadow mt-3">
            <EnhancedTable
              headCells={headCells}
              rows={rows}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numOfRows={numOfRows}
              actionButtons={[
                { btnName: "Edit", actionFunc: editClickHandler },
              ]}
              isToolbarVisible={true}
              optionalButton={
                <Button variant="success" className="pb-2" onClick={handleShow}>
                  Add new
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturer;

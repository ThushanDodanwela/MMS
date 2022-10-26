import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import EnhancedTable from "../../components/Table/EnhancedTable";

const Lecturer = ({ setNavbar }) => {
  const tableRows = [
    {
      id: "asdfdsfsd1",
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      id: "asdfdsfsd2",
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      id: "asdfdsfsd3",
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      id: "asdfdsfsd4",
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      id: "asdfdsfsd5",
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
  ];

  function createData(lec_id, lec_name, position, room, phone, email) {
    return {
      lec_id,
      lec_name,
      position,
      room,
      phone,
      email,
    };
  }

  const [numOfRows, setNumOfRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      id: "room",
      numeric: true,
      disablePadding: false,
      align: "center",

      label: "Room",
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

  const editClickHandler = (leecturerId) => {
    let lecturerToEdit = tableRows.filter(
      (lecturer) => lecturer.id === leecturerId
    );
    console.log(lecturerToEdit);
    handleShow();
  };

  // Data retriving
  useEffect(() => {
    setRows(
      tableRows.map((lecturer) => {
        return createData(
          lecturer.id,
          lecturer.name,
          lecturer.position,
          lecturer.room,
          lecturer.phone,
          lecturer.email
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    "Lecturer Name",
    "Position",
    "Room",
    "Phone",
    "Email",
    "Actions",
  ];

  useEffect(() => {
    setNavbar("Lecturers");
  });

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
                    type="text"
                    placeholder="Prof. Janaka Wijayanayake"
                  />

                  <Form.Label className="pt-3">Position</Form.Label>
                  <Form.Select>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <Form.Label className="pt-3">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="+94 (0)11 2914482(ext204)"
                  />

                  <Form.Label className="pt-3">Email</Form.Label>
                  <Form.Control type="text" placeholder="janaka@kln.ac.lk" />

                  <Form.Label className="pt-3">Qualifications</Form.Label>
                  <Form.Control
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
              <Button variant="success" onClick={handleClose}>
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

import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

const Lecturer = ({ setNavbar }) => {
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

  const rows = [
    {
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
    {
      name: "Prof. Janaka Wijayanayake",
      position: "Head of the Department",
      room: "A4.201",
      phone: "+94 (0)11 2914482(ext204)",
      email: "janaka@kln.ac.lk",
    },
  ];

  useEffect(() => {
    setNavbar("Lecturers");
  });

  return (
    <div className="module">
      <div className="listContainer ">
        <div className="table pt-5 px-4">
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
                  <Form.Control type="text" placeholder="Senior Lecturer" />

                  <Form.Label className="pt-3">Room</Form.Label>
                  <Form.Control type="text" placeholder="A4.201" />

                  <Form.Label className="pt-3">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="+94 (0)11 2914482(ext204)"
                  />

                  <Form.Label className="pt-3">Email</Form.Label>
                  <Form.Control type="text" placeholder="janaka@kln.ac.lk" />
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

          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th key={index} className="tablecell text-center">
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="tablecell text-center">{row.name}</td>
                  <td className="tablecell text-center">{row.position}</td>
                  <td className="tablecell text-center">{row.room}</td>
                  <td className="tablecell text-center">{row.phone}</td>
                  <td className="tablecell text-center">
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <span className="text-success" role="button">
                        <FaEdit className="me-2" size={25} />
                      </span>
                      <span className="text-danger" role="button">
                        <MdDelete className="ms-2" size={28} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <FloatingButton handleShow={handleShow} />
        </div>
      </div>
    </div>
  );
};

export default Lecturer;

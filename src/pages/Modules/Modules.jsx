import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import { Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Module = ({setNavbar}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    "Module Code",
    "Module Name",
    "Level",
    "Credits",
    "Semester",
    "Actions"
  ];
  const rows = [
    {
      moduleCode: "INTE2223",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
    {
      moduleCode: "INTE2122",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
    {
      moduleCode: "INTE2722",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
    {
      moduleCode: "INTE2228",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
  ];

  setNavbar("Modules");
  
  return (
    <div className="module">
      <div className="listContainer ">
        <div className="table pt-5 px-4">


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Module</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Module Code</Form.Label>
                  <Form.Control type="text" placeholder="INTE 12212" />
                  <Form.Label className="pt-3">Module Name</Form.Label>
                  <Form.Control type="text" placeholder="Web Development" />
                  <Form.Label className="pt-3">Credits</Form.Label>
                  <Form.Control type="number" placeholder="2" min={1} max={6} />

                  <div className="d-flex">
                    <div className="col pe-2 pt-4">
                      <Form.Select aria-label="Default select example">
                        <option>Select Level</option>
                        <option value="Level 01">Level 01</option>
                        <option value="Level 02">Level 02</option>
                        <option value="Level 03">Level 03</option>
                        <option value="Level 04">Level 04</option>
                      </Form.Select>
                    </div>
                    <div className="col ps-2 pt-4">
                      <Form.Select aria-label="Default select example">
                        <option>Select Semester</option>
                        <option value="Semester 1">Semester 01</option>
                        <option value="Semester 2">Semester 02</option>
                      </Form.Select>
                    </div>
                  </div>
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
                  <td className="tablecell text-center">{row.moduleCode}</td>
                  <td className="tablecell text-center">{row.moduleName}</td>
                  <td className="tablecell text-center">{row.level}</td>
                  <td className="tablecell text-center">{row.credits}</td>
                  <td className="tablecell text-center">{row.semester}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <span className="text-success" role="button">
                        <FaEdit class="me-2" size={25} />
                      </span>
                      <span className="text-danger" role="button">
                        <MdDelete class="ms-2" size={28} />
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

export default Module;

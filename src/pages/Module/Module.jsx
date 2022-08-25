import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Module = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    "Module Code",
    "Module Name",
    "Level",
    "Credits",
    "Semester",
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
      moduleCode: "INTE2222",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
    {
      moduleCode: "INTE2222",
      moduleName: "Advanced Web Appplication Development",
      level: "Level 2",
      credits: "2",
      semester: "Semester 2",
    },
  ];
  return (
    <div className="module">
      <div className="listContainer ">
        <div className="table pt-5 px-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index} className="tablecell text-center">
                        {column}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="tablecell text-center">
                      {row.moduleCode}
                    </TableCell>
                    <TableCell className="tablecell text-center">
                      {row.moduleName}
                    </TableCell>
                    <TableCell className="tablecell text-center">
                      {row.level}
                    </TableCell>
                    <TableCell className="tablecell text-center">
                      {row.credits}
                    </TableCell>
                    <TableCell className="tablecell text-center">
                      {row.semester}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <FloatingButton handleShow={handleShow} />
      </div>
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
    </div>
  );
};

export default Module;

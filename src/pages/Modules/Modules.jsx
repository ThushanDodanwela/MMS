import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import RecentModulesCard from "../../components/RecentModulesCard/RecentModulesCard";
import Button from "@mui/material/Button";
import { getAllModules } from "../../App/ModuleServices";

const Module = ({ setNavbar }) => {
  function createData(
    module_id,
    module_code,
    module_name,
    level,
    credit,
    semester
  ) {
    return {
      module_id,
      module_code,
      module_name,
      level,
      credit,
      semester,
    };
  }

  const [rows, setRows] = useState([]);

  const onSuccessRetrive = (data) => {
    setRows(data.modules);
  };

  // Data retriving
  useEffect(() => {
    getAllModules(onSuccessRetrive);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
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

  const rows = [
    {
      id: "module_code",
      numeric: false,
      disablePadding: true,
      label: "Module Code",
      align: "center",
    },
    {
      id: "module_name",
      numeric: true,
      disablePadding: false,
      align: "center",

      label: "Module Name",
    },

    {
      id: "level",
      numeric: true,
      disablePadding: false,
      align: "center",

      label: "Level",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      align: "center",
      label: "No of Credits",
    },

    {
      id: "semester",
      numeric: true,
      disablePadding: false,
      label: "Semester",
      align: "center",
    },

    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      align: "center",
      sorting: false,
    },
  ];

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

  const onChangeInput = (event) => {
    setModuleInfo({
      ...moduleInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClick = (moduleCode) => {
    let selectedModule = rows.find((module) => {
      if (module.moduleCode === moduleCode) {
        return module;
      }
    });
    setModuleInfo({ ...selectedModule });
    setShow(true);
  };

  return (
    <div className="col-12">
      <div className="listContainer ">
        <div className="table pt-1 ">
          <div className="mb-4">
            <div className="d-flex justify-content-between fw-semibold ">
              <div className="fs-5">Recent Modules</div>
              <div>&lt; &gt;</div>
            </div>

            <div
              className="d-flex gap-4 ps-3 pt-2"
              style={{ maxWidth: "70rem", overflowX: "hidden" }}
            >
              <RecentModulesCard
                moduleCode="MGTE 31222"
                moduleName="Advanced Statistics Techniques"
                level="02"
                semester="02"
              />
              <RecentModulesCard
                moduleCode="INTE 31222"
                moduleName="Advanced Statistics Techniques"
                level="02"
                semester="02"
              />
              <RecentModulesCard
                moduleCode="INTE 31222"
                moduleName="Advanced Statistics Techniques"
                level="02"
                semester="02"
              />
              <RecentModulesCard
                moduleCode="INTE 31222"
                moduleName="Advanced Statistics Techniques"
                level="02"
                semester="02"
              />
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Module</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Module Code</Form.Label>
                  <Form.Control
                    name="moduleCode"
                    type="text"
                    placeholder="INTE 12212"
                    value={moduleInfo.moduleCode}
                    onChange={onChangeInput}
                  />
                  <Form.Label className="pt-3">Module Name</Form.Label>
                  <Form.Control
                    name="moduleName"
                    type="text"
                    placeholder="Web Development"
                    value={moduleInfo.moduleName}
                    onChange={onChangeInput}
                  />
                  <Form.Label className="pt-3">Credits</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="2"
                    min={1}
                    max={6}
                    value={moduleInfo.credits}
                    onChange={onChangeInput}
                    name="credits"
                  />

                  <div className="d-flex">
                    <div className="col pe-2 pt-4">
                      <Form.Select
                        aria-label="Default select example"
                        value={moduleInfo.level}
                        onChange={onChangeInput}
                        name="level"
                      >
                        <option value="Select Level">Select Level</option>
                        <option value="Level 1">Level 01</option>
                        <option value="Level 2">Level 02</option>
                        <option value="Level 3">Level 03</option>
                        <option value="Level 4">Level 04</option>
                      </Form.Select>
                    </div>
                    <div className="col ps-2 pt-4">
                      <Form.Select
                        aria-label="Default select example"
                        value={moduleInfo.semester}
                        onChange={onChangeInput}
                        name="semester"
                      >
                        <option value="Select Semester">Select Semester</option>
                        <option value="Semester 1">Semester 01</option>
                        <option value="Semester 2">Semester 02</option>
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
                onClick={handleClose}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <div className=" fw-semibold ps-2 pt-3 pb-3 d-flex justify-content-between ">
            <div className="fs-5">All Modules</div>
            <div className="pe-4">
              <Button
                className="btn bg-success text-light px-3 rounded-2"
                onClick={() => {
                  setShow(true);
                }}
              >
                Add new
              </Button>
            </div>
          </div>
          <Table borderless hover>
            <thead>
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th
                      key={index}
                      className="tablecell text-center pb-3"
                      style={{ color: "#B5B7C0" }}
                    >
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border border-0">
                  <td className="tablecell text-center">{row.moduleCode}</td>
                  <td className="tablecell text-center">{row.moduleName}</td>
                  <td className="tablecell text-center">{row.level}</td>
                  <td className="tablecell text-center">{row.credits}</td>
                  <td className="tablecell text-center">{row.semester}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <span
                        className="text-success"
                        role="button"
                        onClick={() => {
                          handleEditClick(row.moduleCode);
                        }}
                      >
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
        </div>
      </div>
    </div>
  );
};

export default Module;

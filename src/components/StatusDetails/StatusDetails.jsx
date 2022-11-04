import React from "react";
import { Button, Modal } from "react-bootstrap";
import RowItem from "./RowItem";

const StatusDetails = ({ show, handleClose, module }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Status History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="d-flex">
              <div className="col-3 fw-semibold me-2">Module Code </div>
              <div>: {module?.module?.moduleCode}</div>
            </div>
            <div className="d-flex mt-1">
              <div className="col-3 fw-semibold me-2">Module Name </div>
              <div>: {module?.module?.moduleName}</div>
            </div>
            <div className="d-flex mt-1">
              <div className="col-3 fw-semibold me-2">Batch</div>
              <div>: {module?.batch}</div>
            </div>
            <div className="d-lg-flex col-12 gap-4 mt-3 ">
              <div className="mb-3 mb-lg-0">
                <div className="fw-semibold  ">Lecturers</div>
                {module?.lecturers?.map((lecturer, index) => (
                  <div key={index}>{lecturer?.lecturer?.name}</div>
                ))}
              </div>
              <div className="mb-3 mb-lg-0">
                <div className="fw-semibold ">Second Examiner </div>
                <div>{module?.secondExaminar?.name}</div>
              </div>
              <div>
                <div className="fw-semibold">Demonstrators</div>
                {module?.demonstrators?.map((demonstrator, index) => (
                  <div>{demonstrator?.name}</div>
                ))}
              </div>
            </div>
            <div className="fw-semibold mt-3">History</div>
            <div>
              <div className="d-flex bg-secondary mt-2">
                <div className="col ps-2 fw-bold">State</div>
                <div className="col fw-bold">Updated On</div>
              </div>
              {module?.state?.map((oneState, index) => (
                <div
                  className="d-flex"
                  style={{ backgroundColor: index % 2 ? "" : "" }}
                >
                  <div
                    className="col ps-2"
                    style={{ textTransform: "capitalize" }}
                  >
                    {oneState?.name.split("_").join("  ").toLowerCase()}
                  </div>
                  <div className="col">
                    {new Date(oneState?.date).toISOString().substring(0, 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="px-4" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StatusDetails;

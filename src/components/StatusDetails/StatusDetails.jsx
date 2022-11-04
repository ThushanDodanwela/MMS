import React from "react";
import { Button, Modal } from "react-bootstrap";
import RowItem from "./RowItem";

const StatusDetails = ({ show, handleClose, module }) => {
  console.log("module", module);
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Status History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="d-flex mb-2">
              <div className="col-3 fw-semibold me-2">Current </div>
              <div>: ksdjfjds</div>
            </div>
            <div className="d-flex">
              <div className="col-3 fw-semibold me-2">Last updated on </div>
              <div>: ksdjfnbjkds</div>
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

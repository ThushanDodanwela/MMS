import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RowItem from "./RowItem";

const StatusDetails = ({ show, handleClose, handleSave }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RowItem />
          <RowItem />
          <RowItem />
          <RowItem />
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

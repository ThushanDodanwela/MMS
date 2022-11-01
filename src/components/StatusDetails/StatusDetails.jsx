import React from "react";
import { Button, Modal } from "react-bootstrap";
import RowItem from "./RowItem";

const StatusDetails = ({ show, handleClose, handleSave }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Status History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RowItem title={"Ongoing Lectures"} date={"22/10/2022"} />
          <RowItem title={"Ongoing Exams"} date={"22/11/2022"} />
          <RowItem title={"Paper Marking I "} date={"22/12/2022"} />
          <RowItem title={"Paper Marking II "} date={"22/01/2023"} />
          <RowItem title={"Results Released"} date={"22/02/2023"} />
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

import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditStatus = ({ show, handleClose, handleSave }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change status [Results Relased]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Status</Form.Label>
          <Form.Select>
            <option value="ONGOING_LECTURES">Lectures Ongoing</option>
            <option value="EXAMS_ONGOING">Exams Ongoing</option>
            <option value="PAPER_MARKING_I">Paper Marking I</option>
            <option value="PAPER_MARKING_II">Paper Marking II</option>
            <option value="RESULTS_RELEASED">Results Released</option>
          </Form.Select>

          <Form.Label className="pt-3">Date</Form.Label>
          <Form.Control type="date" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditStatus;

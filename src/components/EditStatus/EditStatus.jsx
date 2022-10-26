import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditStatus = ({ show, handleClose, handleSave }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change status [Current Status]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Status</Form.Label>
          <Form.Select>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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

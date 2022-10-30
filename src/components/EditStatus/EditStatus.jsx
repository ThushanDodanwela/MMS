import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditStatus = ({ show, setShowEditStatus, statusInfo, setStatusInfo }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          setShowEditStatus(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change status [Results Relased]</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Status</Form.Label>
          <Form.Select
            onChange={(event) => {
              setStatusInfo({
                ...statusInfo,
                name: event.target.value,
              });
            }}
          >
            <option value="ONGOING_LECTURES">Lectures Ongoing</option>
            <option value="EXAMS_ONGOING">Exams Ongoing</option>
            <option value="PAPER_MARKING_I">Paper Marking I</option>
            <option value="PAPER_MARKING_II">Paper Marking II</option>
            <option value="RESULTS_RELEASED">Results Released</option>
          </Form.Select>

          <Form.Label className="pt-3">Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(event) => {
              setStatusInfo({
                ...statusInfo,
                date: event.target.value,
              });
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowEditStatus(false);
            }}
          >
            OKAY
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditStatus;

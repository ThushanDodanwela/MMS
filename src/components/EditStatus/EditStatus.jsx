import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { STATES } from "../../const";

const EditStatus = ({ show, setShowEditStatus, statusInfo, setStatusInfo }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          setShowEditStatus(false);
        }}
        centered
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
            {STATES.map((state, index) => {
              return (
                <option key={index} value={state.value}>
                  {state.label}
                </option>
              );
            })}
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

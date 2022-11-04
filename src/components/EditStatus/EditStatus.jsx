import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateAllocationState } from "../../App/AllocationsServices";
import { STATES } from "../../const";

const EditStatus = ({
  show,
  setShowEditStatus,
  statusInfo,
  setStatusInfo,
  update = false,
}) => {
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
          <Modal.Title>{update ? "Change" : "Set"} status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {update && (
            <div className="mb-3">
              <div className="d-flex mb-2">
                <div className="col-5 col-lg-3 fw-semibold me-2">Current </div>
                <div>: {statusInfo ? statusInfo.currentStatus : ""}</div>
              </div>
              <div className="d-flex">
                <div className="col-5 col-lg-3 fw-semibold me-2">
                  Last updated on{" "}
                </div>
                <div>
                  :{" "}
                  {statusInfo
                    ? new Date(statusInfo.lastUpdatedOn).toDateString() ===
                      "Invalid Date"
                      ? ""
                      : new Date(statusInfo.lastUpdatedOn).toDateString()
                    : ""}
                </div>
              </div>
            </div>
          )}
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
              if (update) {
                const req = {
                  _id: statusInfo._id,
                  state: {
                    name: statusInfo.name,
                    date: statusInfo.date,
                  },
                };
                updateAllocationState(req, (data) => {
                  if (data.message === "success") {
                    setShowEditStatus(false);
                    alert(data.message ? data.message : "");
                  } else {
                    alert(data.message ? data.message : "");
                  }
                });
                //send request
                console.log(statusInfo);
              } else {
                setShowEditStatus(false);
              }
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

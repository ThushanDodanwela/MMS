import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAllocationState } from "../../App/AllocationsServices";
import { STATES } from "../../const";
import { showAlert } from "../../reducers/alertSlice";

const EditStatus = ({
  show,
  setShowEditStatus,
  statusInfo,
  currentInfo,
  setStatusInfo,
  setCurrentInfo,
  update = false,
}) => {
  const dispatcher = useDispatch();
  const [validation, setValidation] = useState({
    //error states 0 - initial view 1-error 2-valid
    state: { visibility: 0, message: "" },
    date: { visibility: 0, message: "" },
  });
  useEffect(() => {
    if (show) {
      setStatusInfo({
        name: "NONE",
        date: new Date().toISOString("en-uk").substring(0, 10),
      });
      setValidation({
        //error states 0 - initial view 1-error 2-valid
        state: { visibility: 0, message: "" },
        date: { visibility: 0, message: "" },
      });
    }
  }, [show]);
  const validateName = (name) => {
    if (name !== "NONE") {
      setValidation((prev) => ({
        ...prev,
        state: {
          visibility: 2,
          message: "",
        },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        state: {
          visibility: 1,
          message: "Please set the state",
        },
      }));
      return false;
    }
  };

  const validateDate = (date) => {
    if (new Date(date) !== "Invalid Date" && date.length > 0) {
      setValidation((prev) => ({
        ...prev,
        date: {
          visibility: 2,
          message: "",
        },
      }));
      return true;
    } else {
      setValidation((prev) => ({
        ...prev,
        date: {
          visibility: 1,
          message: "Please set the date of state",
        },
      }));
      return false;
    }
  };

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
                <div>: {currentInfo ? currentInfo.name : ""}</div>
              </div>
              <div className="d-flex">
                <div className="col-5 col-lg-3 fw-semibold me-2">
                  Last updated on{" "}
                </div>
                <div>
                  :{" "}
                  {currentInfo
                    ? new Date(currentInfo.date).toDateString() ===
                      "Invalid Date"
                      ? ""
                      : new Date(currentInfo.date).toDateString()
                    : ""}
                </div>
              </div>
            </div>
          )}
          <Form.Label>Status</Form.Label>
          <Form.Select
            onChange={(event) => {
              validateName(event.target.value);
              setStatusInfo({
                ...statusInfo,
                name: event.target.value,
              });
            }}
            {...(validation.state.visibility === 1 && { isInvalid: true })}
            {...(validation.state.visibility === 2 && { isValid: true })}
          >
            {STATES.map((state, index) => {
              return (
                <option key={index} value={state.value}>
                  {state.label}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {validation.state.message}
          </Form.Control.Feedback>
          <Form.Label className="pt-3">Date</Form.Label>
          <Form.Control
            type="date"
            value={statusInfo.date}
            onChange={(event) => {
              console.log(event.target.value);
              validateDate(event.target.value);
              setStatusInfo({
                ...statusInfo,
                date: event.target.value,
              });
            }}
            {...(validation.date.visibility === 1 && { isInvalid: true })}
            {...(validation.date.visibility === 2 && { isValid: true })}
          />
          <Form.Control.Feedback type="invalid">
            {validation.date.message}
          </Form.Control.Feedback>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              if (
                validateDate(statusInfo.date) &&
                validateName(statusInfo.name)
              ) {
                if (update) {
                  const req = {
                    _id: currentInfo._id,
                    state: {
                      name: statusInfo.name,
                      date: statusInfo.date,
                    },
                  };
                  updateAllocationState(
                    req,
                    (data) => {
                      if (data.message === "success") {
                        setCurrentInfo(statusInfo);
                        setShowEditStatus(false);
                        dispatcher(
                          showAlert({
                            isVisible: true,
                            message: `State updated successfully`,
                            btnText: "",
                            btnAction: () => {},
                          })
                        );
                      }
                    },
                    (error) => {
                      setShowEditStatus(false);

                      dispatcher(
                        showAlert({
                          isVisible: true,
                          message: error,
                          btnText: "",
                          btnAction: () => {},
                        })
                      );
                    }
                  );
                  //send request
                } else {
                  setShowEditStatus(false);
                }
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

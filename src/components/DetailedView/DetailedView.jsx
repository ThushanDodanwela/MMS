import React from "react";
import { Button, Modal } from "react-bootstrap";

const DetailedView = ({ showDetailedView, setShowDetailedView, children }) => {
  return (
    <div>
      <Modal
        show={showDetailedView}
        onHide={() => {
          setShowDetailedView(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Module Management System</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowDetailedView(false);
            }}
          >
            OKAY
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailedView;

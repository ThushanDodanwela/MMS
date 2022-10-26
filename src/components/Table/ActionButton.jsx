import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ActionButton({ text, actionClickHandler }) {
  return (
    <Button
      variant="outlined"
      className="p-1 px-3 text-primary"
      onClick={() => actionClickHandler()}
    >
      {text}
    </Button>
  );
}

export default ActionButton;

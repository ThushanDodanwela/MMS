import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ActionButton({ text, actionClickHandler }) {
  return (
    <span
      className="bg-btns px-3 rounded-pill py-1 text-light"
      style={{
        cursor: "pointer",
      }}
      onClick={() => actionClickHandler()}
    >
      {text}
    </span>
  );
}

export default ActionButton;

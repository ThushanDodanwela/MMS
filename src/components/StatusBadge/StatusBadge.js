import React from "react";

const styles = {
  backgroundColor: "#c5f6c7",
  border: "2px solid #2ef936",
  textTransform: "capitalize",
};

const StatusBadge = ({ title, onClick, isInvalid = false }) => {
  return (
    <span
      onClick={onClick}
      className={` px-2 py-1 rounded-5 fw-bold ${
        isInvalid ? "text-danger" : ""
      }`}
      style={styles}
    >
      {title}
    </span>
  );
};

export default StatusBadge;

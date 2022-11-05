import React from "react";

const ErrorDetails = ({ title, message }) => {
  return (
    <div>
      <div className="fw-bold">{title}</div>
      <div className="ms-3"> {message}</div>
    </div>
  );
};

export default ErrorDetails;

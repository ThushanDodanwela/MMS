import React from "react";
import { BsPlusLg } from "react-icons/bs";

function FloatingButton({ handleClick }) {
  return (
    <div
      className="bg-success rounded-circle d-flex align-items-center justify-content-center position-fixed "
      style={{
        width: "60px",
        height: "60px",
        cursor: "pointer",
        bottom: "40px",
        right: "40px",
      }}
      onClick={handleClick}
    >
      <BsPlusLg className="text-white" size={25} />
    </div>
  );
}

export default FloatingButton;

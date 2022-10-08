import React from "react";

function LecturerDashboardSmallCard() {
  return (
    <div
      className="col-2 p-3 rounded-3"
      style={{ backgroundColor: "#008f7a", minHeight: "6rem" }}
    >
      <div className="d-flex">
        <div>
          <div className="text-white fs-4 text-nowrap">Total modules</div>
          <div className="fs-2">99</div>
        </div>
        <div className="d-flex align-items-center px-2">icon</div>
      </div>
    </div>
  );
}

export default LecturerDashboardSmallCard;

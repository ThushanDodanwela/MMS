import React from "react";

function LecturerDashboardSmallCard({
  title = "Total modules",
  count = "99",
  icon = "icon",
}) {
  return (
    <div
      className="col-2 p-3 rounded-3 shadow"
      style={{ backgroundColor: "white", minHeight: "6rem" }}
    >
      <div className="d-flex">
        <div>
          <div className=" fs-5 text-nowrap">{title}</div>
          <div className="fs-2">{count}</div>
        </div>
        <div className="d-flex align-items-center px-2">{icon}</div>
      </div>
    </div>
  );
}

export default LecturerDashboardSmallCard;

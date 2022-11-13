import React from "react";
import { IoMdToday } from "react-icons/io";

function LecturerDashboardSmallCard({ title = "", count = "00" }) {
  return (
    <div
      className="col p-3 rounded-3 shadow"
      style={{ backgroundColor: "white", minHeight: "6rem" }}
    >
      <div className="d-flex">
        <div>
          <div className=" fs-5 text-nowrap">{title}</div>
          <div className="fs-2">{count}</div>
        </div>
        <div className="col d-flex  px-2 justify-content-end">
          <IoMdToday size={50} className="mt-2" />
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboardSmallCard;

import React from "react";
import { Card } from "react-bootstrap";

function ModuleCard({ moduleCode, moduleName, level, semester, state }) {
  return (
    <div className="p-2">
      <Card
        className={`p-3 ${
          moduleCode
            ? moduleCode.substring(0, 1) === "M"
              ? "module-management"
              : "module-it"
            : ""
        } ps-4 rounded-4 shadow-sm`}
        style={{ minWidth: "18rem" }}
      >
        <div className="d-flex">
          <div>
            <div className="fw-bold">{moduleCode}</div>
            <div className="mt-2">{moduleName}</div>
            <div>Semester {semester}</div>
            <div>Level {level}</div>
          </div>
          <div className="col text-end">
            <span
              onClick={() => {
                console.log("State changed");
              }}
              role="button"
              className="rounded-5 px-2 pb-1 border border-1 border-red-100 text-red-100 pointer-cursor user-select-none"
            >
              {state}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ModuleCard;

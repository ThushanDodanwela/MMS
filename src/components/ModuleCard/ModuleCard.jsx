import { Button } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";

function ModuleCard({
  allocationId,
  moduleCode,
  moduleName,
  level,
  semester,
  state,
  onClick,
  editClick,
  handleCloseStatusDetails,
}) {
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
        <div className="">
          <div className="d-flex col justify-content-between">
            <div className="fw-bold">{moduleCode}</div>

            <span
              onClick={() => {
                console.log(state.length);
                if (state.length > 0) {
                  editClick(
                    allocationId,
                    state[state.length - 1].name,
                    state[state.length - 1].date
                  );
                } else {
                  editClick(allocationId, "", "");
                }
              }}
              role="button"
              style={{ fontSize: "12px", alignItems: "center" }}
              className="d-flex rounded-5 px-2 border border-1 border-red-100 text-red-100 pointer-cursor user-select-none"
            >
              {state[state.length - 1]
                ? state[state.length - 1].name
                : "ERROR_LOADIND"}
            </span>
          </div>
          <div className="fw-semibold pt-1" style={{ fontSize: "15px" }}>
            {moduleName}
          </div>
          <div className="text-secondary">Semester 0{semester}</div>
          <div className="d-flex justify-content-between">
            <div className="text-secondary">Level 0{level}</div>
            <div>
              <Button onClick={onClick}>View Summery</Button>
            </div>
          </div>
          {/* <div>
            <div className="fw-bold">{moduleCode}</div>
            <div className="mt-2">{moduleName}</div>
            <div>Semester {semester}</div>
            <div>Level {level}</div>
          </div>
          <div className="col text-end">
           
          </div> */}
        </div>
      </Card>
    </div>
  );
}

export default ModuleCard;

import React from "react";
import { Card } from "react-bootstrap";

function RecentModulesCard({ moduleCode, moduleName, level, semester }) {
  return (
    <Card className={`p-3 ${moduleCode ? (moduleCode.substring(0, 1) === "M" ? "module-management" : "module-it") : ""} ps-4 rounded-4 shadow-sm`} style={{ minWidth: "18rem" }}>
      <div className="fw-bold">{moduleCode}</div>
      <div>{moduleName}</div>
      <div>
        Semester {semester}
      </div>
      <div>Level {level}</div>
    </Card>
  );
}

export default RecentModulesCard;

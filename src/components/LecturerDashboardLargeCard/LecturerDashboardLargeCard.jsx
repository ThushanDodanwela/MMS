import { Button } from "@mui/material";
import React from "react";

function LecturerDashboardLargeCard() {
  return (
    <div className="col-4 p-2">
      <div className="border">
        <div className="p-2">
          <div>Title</div>
          <div>Module name</div>
          <div>Course completion</div>
          <div>Exams on 23rd</div>
        </div>
        <div className="d-flex mt-3">
          <Button variant="contained" color="secondary" className="col border-end-0 rounded-0">
            See more
          </Button>
          <Button variant="contained" color="primary" className="col border-start-0 rounded-0">
            See more
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboardLargeCard;

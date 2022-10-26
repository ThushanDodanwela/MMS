import React, { useEffect } from "react";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import IMBatchSelect from "../../components/IMBatchSelect/IMBatchSelect";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import TimetableCard from "../../components/TimetableCard/TimetableCard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Row } from "react-bootstrap";

const Allocations = ({ setNavbar }) => {
  useEffect(() => {
    setNavbar("Allocations");
  });
  return (
    <div className="ps-3 pt-3">
      {/* course details section */}
      <div className="d-flex">
        <div className="col-3">
          {/* course details goes here */}
          <div className="py-2 fw-semibold fs-5 pe-3">Code</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Name</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Semester</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Credits</div>
          <div className="py-2 fw-semibold fs-5 pe-3">Level</div>
        </div>

        <div className="col-4">
          <div className="py-2 fs-5">: INTE-22339</div>
          <div className="py-2 fs-5">: Mobile Application Development</div>
          <div className="py-2 fs-5">: 2nd Semester</div>
          <div className="py-2 fs-5">: 2 Credits</div>
          <div className="py-2 fs-5">: Level 03</div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <IMBatchSelect options={["IM 2018", "IM 2017"]} />
            <StatusBadge title={"Ongoing Exams"} />
          </div>
        </div>
      </div>
      {/* */}
      <div className="d-flex gap-2 mt-3">
        <div className="pt-3 col">
          <AutoComplete dataset={datasetLecturers} title={"Lectures"} />
          <label className="mt-3">Janaka Wijenayake</label>
          <input type="number" className="form-control mt-1 " />
        </div>

        <div className=" pt-3 col">
          <AutoComplete dataset={datasetCoordinators} title={"2nd Examiner"} />
        </div>
        <div className="pt-3 col">
          <AutoComplete
            dataset={datasetDemonstrators}
            title={"Demonstrators"}
          />
        </div>
      </div>
      <div
        className="position-absolute"
        style={{ bottom: "15px", right: "35px" }}
      >
        <button className="btn btn-secondary me-3 px-4"> Back </button>
        <button className="btn btn-primary px-3"> Update </button>
      </div>
    </div>
  );
};

export default Allocations;

const datasetCoordinators = [
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Janaka Wijenayaka",
  },
  {
    title: "Dilani Wickramaarachchi",
  },
  {
    title: "Ruwan Wickramarachchi",
  },
  {
    title: "Shantha Jayalal",
  },
];

const datasetLecturers = [
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Janaka Wijenayaka",
  },
  {
    title: "Dilani Wickramaarachchi",
  },
  {
    title: "Ruwan Wickramarachchi",
  },
  {
    title: "Shantha Jayalal",
  },
];

const datasetDemonstrators = [
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Janaka Wijenayaka",
  },
  {
    title: "Dilani Wickramaarachchi",
  },
  {
    title: "Ruwan Wickramarachchi",
  },
  {
    title: "Shantha Jayalal",
  },
];

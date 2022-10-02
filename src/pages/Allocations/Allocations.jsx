import React from "react";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import IMBatchSelect from "../../components/IMBatchSelect/IMBatchSelect";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import TimetableCard from "../../components/TimetableCard/TimetableCard";

const Allocations = ({ setNavbar }) => {
  setNavbar("Allocations");

  return (
    <div className="d-flex ps-3 pt-3">
      <div className="col-6 ">
        {/* course details section */}
        <div className="d-flex">
          <div className="col-4">
            {/* course details goes here */}
            <div className="py-2 fw-semibold fs-5 pe-3">Code</div>
            <div className="py-2 fw-semibold fs-5 pe-3">Name</div>
            <div className="py-2 fw-semibold fs-5 pe-3">Semester</div>
            <div className="py-2 fw-semibold fs-5 pe-3">Credits</div>
            <div className="py-2 fw-semibold fs-5 pe-3">Level</div>
          </div>

          <div>
            <div className="py-2 fs-5">: INTE-22339</div>
            <div className="py-2 fs-5">: Mobile Application Development</div>
            <div className="py-2 fs-5">: 2nd Semester</div>
            <div className="py-2 fs-5">: 2 credits</div>
            <div className="py-2 fs-5">: Level 03</div>
          </div>
        </div>

        <div className="mt-3 pe-4">
          <div className="fw-semibold fs-5 mb-2">Timetable</div>
          <TimetableCard title={"Week 03 - Mobile Architecture and Mobile Applications" } date={"22/12/2022"} time={"12:30 PM"} lecturer={"Mr. Nawanjana"}/>
          <TimetableCard title={"Week 04 - Android XML linear layout" } date={"29/12/2022"} time={"12:30 PM"} lecturer={"Mr. Nawanjana"}/>
        </div>
      </div>
      <div className="col pe-4">
        <div className="d-flex justify-content-end">
          <IMBatchSelect options={["IM 2018", "IM 2017"]} />
          <StatusBadge title={"Ongoing Exams"} />
        </div>
        <div className="pt-3">
          <AutoComplete dataset={datasetLecturers} title={"Lectures"} />
        </div>
        {/* coordinatior section */}
        <div className=" pt-3">
          <AutoComplete dataset={datasetCoordinators} title={"Coordinators"} />
        </div>
        <div className="pt-3">
          <AutoComplete dataset={datasetDemonstrators} title={"Demonstrators"} />
        </div>
      </div>
      <div className="position-absolute" style={{ bottom: "15px", right: "35px" }}>
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

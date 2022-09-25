import React from "react";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import IMBatchSelect from "../../components/IMBatchSelect/IMBatchSelect";
import StatusBadge from "../../components/StatusBadge/StatusBadge";


const Allocations = ({ setNavbar }) => {
  setNavbar("Allocations");

  return (
    <div className="d-flex">
      <div>

        {/* course details section */}
        <div className="d-flex">

          <div>
            {/* course details goes here */}
            <div>Code</div>
            <div>Name</div>
            <div>Semester</div>
            <div>Credits</div>
            <div>Level</div>
          </div>

          <div>
            <div>INTE-22339</div>
            <div>Mobile Application Development</div>
            <div>2nd Semester</div>
            <div>2 credits</div>
            <div>Level 03</div>
          </div>

        </div>

        {/* coordinatior section */}
        <div>
        <AutoComplete dataset={datasetCoordinators}  title={"Coordinators"}/>
        </div>
      </div>
      <div className="col">
        <div className="mt-3 d-flex justify-content-end">
          <IMBatchSelect options={["IM 2018", "IM 2017"]} />
          <StatusBadge title={"Ongoing Exams"} />
        </div>
        <div>
        <AutoComplete dataset={datasetLecturers} title={"Lectures"}/>
        </div>
        <div>
        <AutoComplete dataset={datasetDemonstrators} title={"Demonstrators"}/>
        </div>
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
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
];

const datasetLecturers = [
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
];

const datasetDemonstrators = [
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
  {
    title: "Buddhika jayawardhana",
  },
];
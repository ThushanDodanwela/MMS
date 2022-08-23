import React from "react";
import "./home.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widget from "../../components/widget/widget";
import Table from "../../components/table/table";

function Home() {

  const columns = ['Module Code','Level','Semestre','Lecturer','Status'];
  const rows = [
    {
      moduleCode: "INTE2222",
      Level: "Level 2",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Released",
    },

    {
      moduleCode: "INTE1222",
      Level: "Level 1",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Pending",
    },

    {
      moduleCode: "INTE2222",
      Level: "Level 3",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Pending",
    },

    {
      moduleCode: "INTE2222",
      Level: "Level 2",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Released",
    },

    {
      moduleCode: "INTE2222",
      Level: "Level 2",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Released",
    },

    {
      moduleCode: "INTE2222",
      Level: "Level 2",
      Semester: "Semester 2",
      Lecturer: "Dr.Chathura Rajapakse",
      Status: "Pending",
    },
  ];
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="Module" />
          <Widget type="Lecture" />
          <Widget type="Results" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Results</div>
          <Table columns={columns} rows={rows}/>
        </div>
      </div>
    </div>
  );
}

export default Home;

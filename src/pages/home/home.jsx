import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Widget from "../../components/widget/widget";
import Table from "../../components/table/table";

function home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="Module" />
          <Widget type="Lecture" />
          <Widget type="Results" />
        </div>

        <div className="listContainer">
          <div className="listTitle">Results</div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default home;

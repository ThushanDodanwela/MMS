import React from "react";
import "./Widget.scss";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SchoolIcon from "@mui/icons-material/School";

function widget({ type }) {
  let data;

  switch (type) {
    case "Module":
      data = {
        title: "MODULES",
        link: "See all",
        counter: 341,
        icon: <LibraryBooksRoundedIcon className="icon" />,
      };
      break;
    case "Lecture":
      data = {
        title: "LECTURES",
        link: "See all",
        counter: 31,
        icon: <SchoolIcon className="icon" />,
      };
      break;
    case "Results":
      data = {
        title: "RESULTS RELEASED",
        link: "See all",
        counter: 28,
        icon: <ShowChartRoundedIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title"> {data.title}</span>
        <span className="counter"> {data.counter}</span>
        <span className="link"> {data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
}

export default widget;

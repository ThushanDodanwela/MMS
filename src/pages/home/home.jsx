import React, { useEffect } from "react";
import "./Home.scss";
import Widget from "../../components/Widget/Widget";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Home({ setNavbar }) {
  const columns = ["Module Code", "Level", "Semestre", "Lecturer", "Status"];
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

  useEffect(() => {
    setNavbar("Dashboard");
  });

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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index} className="tablecell">
                        {column}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="tablecell">
                      {row.moduleCode}
                    </TableCell>
                    <TableCell className="tablecell">{row.Level}</TableCell>
                    <TableCell className="tablecell">{row.Semester}</TableCell>
                    <TableCell className="tablecell">{row.Lecturer}</TableCell>
                    <TableCell className="tablecell">
                      <span className={`status ${row.Status}`}>
                        {row.Status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function table() {
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
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tablecell">Module Code</TableCell>
              <TableCell className="tablecell">Level</TableCell>
              <TableCell className="tablecell">Semestre</TableCell>
              <TableCell className="tablecell">Lecturer</TableCell>
              <TableCell className="tablecell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.moduleCode}>
                <TableCell className="tablecell">{row.moduleCode}</TableCell>
                <TableCell className="tablecell">{row.Level}</TableCell>
                <TableCell className="tablecell">{row.Semester}</TableCell>
                <TableCell className="tablecell">{row.Lecturer}</TableCell>
                <TableCell className="tablecell">
                  <span className={`status ${row.Status}`}>{row.Status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default table;

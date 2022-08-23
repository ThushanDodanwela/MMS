import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function table({columns,rows}) {
  

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column,index)=>{
                return <TableCell key={index} className="tablecell">{column}</TableCell>;
              })}
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

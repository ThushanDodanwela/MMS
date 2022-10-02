import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Row, Col } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "react-bootstrap/Badge";
import { Button } from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function createData(
  LecturerName,
  LecturerType,
  ModuleName,
  ModuleCode,
  LevelYear,
  Semester,
  Demonstrator,
  Coordinator,
  Status
) {
  return {
    LecturerName,
    LecturerType,
    ModuleName,
    ModuleCode,
    LevelYear,
    Semester,
    Demonstrator,
    Coordinator,
    Status,
  };
}

const rows = [
  createData(
    "Janaka Wijenayake",
    "Lecturer",
    "Web Development",
    "INTE31222",
    "Level 03",
    "Semester 2",
    "Ms.Dinesha",
    "Dr.Shantha Jayalal",
    "Lectures Finished"
  ),
  createData(
    "Janaka Wijenayake",
    "Lecturer",
    "Web Development",
    "INTE31222",
    "Level 03",
    "Semester 2",
    "Ms.Dinesha",
    "Dr.Shantha Jayalal",
    "Lectures Finished"
  ),
];

function AllocationsView() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Lecturer</TableCell>
            <TableCell> Module</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Demonstrator</TableCell>
            <TableCell>Coordinator</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.LecturerName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="d-flex  gap-3">
                  <Avatar {...stringAvatar(row.LecturerName)} />
                  <Col>
                    <p className="fw-bold mb-1">{row.LecturerName}</p>
                    <p className="text-muted mb-0">{row.LecturerType}</p>
                  </Col>
                </div>
              </TableCell>

              <TableCell component="th" scope="row">
                <Col>
                  <p className="fw-bold mb-1">{row.ModuleCode}</p>
                  <p className="text-muted mb-0">{row.ModuleName}</p>
                </Col>
              </TableCell>

              <TableCell component="th" scope="row">
                <Col>
                  <p className="fw-bold mb-1">{row.LevelYear}</p>
                  <p className="text-muted mb-0">{row.Semester}</p>
                </Col>
              </TableCell>

              <TableCell component="th" scope="row">
                <Col>
                  <p className="fw-bold mb-1">{row.Demonstrator}</p>
                </Col>
              </TableCell>

              <TableCell component="th" scope="row">
                <Col>
                  <p className="fw-bold mb-1">{row.Coordinator}</p>
                </Col>
              </TableCell>

              <TableCell component="th" scope="row">
                <Col align="center">
                  <Badge pill bg="primary">
                    Ongoing Lectures
                  </Badge>{" "}
                </Col>
              </TableCell>
              <TableCell component="th" scope="row">
                <Col align="center">
                  <Button color="secondary">Edit</Button>
                  <Button color="error">Delete</Button>
                </Col>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllocationsView;

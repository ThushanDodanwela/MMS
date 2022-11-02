import { Add } from "@mui/icons-material";
import { Button, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { getAllocations } from "../../App/AllocationsServices";
import CustomButton from "../../components/CustomButton/CustomButton";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import SearchBar from "../../components/SearchBar/SearchBar";

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
  SecondExaminer,
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
    SecondExaminer,
    Status,
  };
}

function Allocations({ setNavbar }) {
  const [allAllocations, setAllAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("NONE");

  const navigate = useNavigate();

  const onSuccessRetriveAllAllocations = (data) => {
    setAllAllocations(data.allocations);
  };
  useEffect(() => {
    setNavbar("Allocations");
    getAllocations(onSuccessRetriveAllAllocations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      let keyword = searchKeyword.toLowerCase();
      setFilteredAllocations(
        allAllocations.filter(
          (module) =>
            module.module.moduleName.toLowerCase().match(keyword) ||
            module.module.moduleCode.toLowerCase().match(keyword)
        )
      );
    } else {
      setFilteredAllocations(allAllocations.slice(0, 5));
    }
    if (filterBy !== "NONE") {
      console.log("filterign");
      setFilteredAllocations((prev) =>
        prev.filter(
          (module) => module.state[module.state.length - 1].name === filterBy
        )
      );
    }
  }, [searchKeyword, allAllocations, filterBy]);

  return (
    <>
      <div className="px-3 pb-5 mb-5 pt-4">
        <TableContainer component={Paper} className="px-2 pb-5 mb-5">
          <div className=" py-2 d-flex ">
            <div className="col-6 ps-1 fs-5 fw-bold d-flex justify-content-start align-items-center">
              All Allocations
              <Chip
                title={
                  "Showing only 5 allocations. Search by module code or module name for other allocations"
                }
                label={`Showing ${filteredAllocations.length} of ${allAllocations.length} allocations`}
                size="small"
                sx={{
                  ml: { xs: 0, lg: 1 },
                  mr: { xs: 3, lg: 0 },
                  marginY: { xs: 1, lg: 0 },
                  fontWeight: "bold",
                  backgroundColor: "#198754;",
                  color: "white",
                }}
              />
            </div>
            <div className="col-5 pe-1">
              <SearchBar
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                hideFilter={true}
              />
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <CustomButton
                variant="contained"
                size="small"
                color="success"
                endIcon={<Add />}
                onClick={() => {
                  navigate("view");
                }}
                sx={{ paddingY: 1.2, fontWeight: "bold" }}
              >
                NEW
              </CustomButton>
            </div>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "#E6E6E6",
              }}
            >
              <TableRow>
                <TableCell className="fw-bold">Lecturer</TableCell>
                <TableCell className="fw-bold"> Module</TableCell>
                <TableCell className="fw-bold">Level</TableCell>
                <TableCell className="fw-bold">Demonstrator</TableCell>
                <TableCell className="fw-bold">2nd Examiner</TableCell>
                <TableCell className="fw-bold" align="center">
                  Status
                </TableCell>
                <TableCell className="fw-bold" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllocations.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="d-flex  gap-3">
                      <Col>
                        {row.lecturers.map((row, index) => {
                          return (
                            <div className="d-flex" key={index}>
                              <Avatar
                                {...stringAvatar(row?.lecturer?.name + " x")}
                              />
                              <div className="ps-2">
                                <p className="fw-bold mb-1">
                                  {row?.lecturer?.name}
                                </p>
                                <p className="text-muted mb-0">
                                  {row?.lecturer?.position}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </Col>
                    </div>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className="fw-bold mb-1">{row.module?.moduleCode}</p>
                      <p className="text-muted mb-0">
                        {row.module?.moduleName}
                      </p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className="fw-bold mb-1">Level {row.module?.level}</p>
                      <p className="text-muted mb-0">
                        Semester {row.module?.semester}
                      </p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      {row?.demonstrators.map((demonstrator, index) => {
                        return (
                          <p className="fw-bold mb-1" key={index}>
                            {demonstrator?.name}
                          </p>
                        );
                      })}
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col>
                      <p className="fw-bold mb-1">{row.secondExaminar?.name}</p>
                    </Col>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Col align="center">
                      <Badge pill bg="primary">
                        {row.state[row.state?.length - 1]?.name}
                      </Badge>
                    </Col>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Col align="center">
                      <Button
                        color="secondary"
                        onClick={() => {
                          navigate("view", { state: row });
                        }}
                      >
                        Edit
                      </Button>
                      <Button color="error">Delete</Button>
                    </Col>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Allocations;

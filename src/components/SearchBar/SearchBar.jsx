import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SearchOutlined, SettingsInputHdmiRounded } from "@mui/icons-material";
import { STATES } from "../../const";

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  filterBy,
  setFilterBy,
  allbatches = [],
  selectedBatch = "",
  setSelectedBatch = () => {},
  hideFilter = false,
}) => {
  const STATE = [
    {
      label: "All Modules",
      value: "NONE",
    },
    ...STATES.slice(1),
  ];

  console.log(STATE);
  return (
    <>
      <div className="d-flex align-items-center col border border-1 rounded-pill p-1 shadow-sm">
        <div className="ms-2 ">
          <SearchOutlined />
        </div>
        <div className={`col-10 ${!hideFilter ? "col-lg-7" : ""}`}>
          <input
            className="form-control mx-2 border-0 "
            placeholder="Search module name or module code"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
        </div>
        {!hideFilter && (
          <div className="d-none d-lg-flex col">
            <div className="mx-2 col-1 text-nowrap d-flex align-items-center fw-semibold">
              Batch :
            </div>
            <div className="col-3 ">
              <select
                className="form-select border-0"
                value={selectedBatch}
                onChange={(e) => {
                  if (e.target.value === "ALL") {
                    setSelectedBatch("");
                    return;
                  }
                  setSelectedBatch(e.target.value);
                }}
              >
                <option value={"ALL"} selected>
                  All Batches
                </option>
                {allbatches.map((batch, index) => {
                  return (
                    <option key={index} value={batch}>
                      {batch}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mx-2 col-2 text-nowrap d-flex align-items-center fw-semibold justify-content-center">
              State:
            </div>
            <div className="col ">
              <select
                className="form-select border-0"
                value={filterBy}
                onChange={(e) => {
                  setFilterBy(e.target.value);
                }}
              >
                {STATE.map((state, index) => {
                  return (
                    <option key={index} value={state.value}>
                      {state.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>
      {!hideFilter && (
        <div className="d-lg-none mt-2">
          <div className="d-flex align-items-center my-2">
            <div className="mx-2 col-2 text-nowrap">Batch :</div>
            <div className="col ">
              <select
                className="form-select border-0"
                value={selectedBatch}
                onChange={(e) => {
                  if (e.target.value === "ALL") {
                    setSelectedBatch("");
                    return;
                  }
                  setSelectedBatch(e.target.value);
                }}
              >
                <option value={"ALL"} selected>
                  All Batches
                </option>
                {allbatches.map((batch, index) => {
                  return (
                    <option key={index} value={batch}>
                      {batch}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="mx-2 col-2 text-nowrap">State:</div>
            <div className="col ">
              <select
                className="form-select border-0"
                value={filterBy}
                onChange={(e) => {
                  setFilterBy(e.target.value);
                }}
              >
                {STATE.map((state, index) => {
                  return (
                    <option key={index} value={state.value}>
                      {state.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;

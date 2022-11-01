import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { SearchOutlined } from "@mui/icons-material";
import { STATES } from "../../const";

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  filterBy,
  setFilterBy,
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
    <div className="d-flex align-items-center col border border-1 rounded-pill p-1 shadow-sm">
      <div className="ms-2 col">
        <SearchOutlined />
      </div>
      <input
        className="form-control mx-2 border-0"
        placeholder="Search module name or module code"
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
      {!hideFilter && (
        <>
          <div className="mx-2 col text-nowrap">Group by :</div>
          <div className="col-2 ">
            <select
              className="form-control border-0"
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
        </>
      )}
    </div>
  );
};

export default SearchBar;

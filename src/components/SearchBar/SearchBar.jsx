import React from "react";

const SearchBar = () => {
  return (
    <div className="d-flex align-items-center col border border-1 rounded-pill p-1 shadow-sm">
      <div className="mx-2 col">filterIcon</div>
      <input
        className="form-control mx-2 border-0"
        placeholder="Search module name"
      />
      <div className="mx-2 col text-nowrap">Group by</div>
      <div className="col-1">
        <select name="" id="" className="form-control border-0" value="status">
          <option value="">Active</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";

const RowItem = ({ title, date }) => {
  return (
    <div className="d-flex mt-2">
      <div className="col-5">{title}</div>
      <div className="col">{date}</div>
    </div>
  );
};

export default RowItem;

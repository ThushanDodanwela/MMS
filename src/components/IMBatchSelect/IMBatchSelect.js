import React from "react";

const IMBatchSelect = ({ options }) => {
  return (
    <div className="mx-2">
      <select name="" id="" className="form-control">
        {options.map((option) => {
          return <option value="">{option}</option>;
        })}
      </select>
    </div>
  );
};

export default IMBatchSelect;

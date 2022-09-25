import React from "react";

const styles = {
    backgroundColor:"#c5f6c7",
    border:"2px solid #2ef936"
}


const StatusBadge = ({title}) => {
  return (
      <span className=" px-2 py-1 rounded-5 fw-bold" style={styles}> {title} </span>
  );
};

export default StatusBadge;

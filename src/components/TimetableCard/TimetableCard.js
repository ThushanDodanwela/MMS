import React from "react";

const badgeStyles = {
    backgroundColor:"rgb(0,255,100,0.3)",
    border:"1px solid rgb(0,200,150)",
}


const TimetableCard = ({title, date, time, lecturer}) => {
  return (
    <div className="p-2 ps-0">
      <div className="rounded-1 p-2 shadow-sm border border-1" style={{backgroundColor:"white",borderColor:"#d9d9d9"}}>
            <div className="mb-1 d-flex justify-content-between position-relative">
                <div className="col-8 fixed-lines " title={title}>{title}</div>
                <span className=" rounded-pill px-2 text-nowrap position-absolute end-0" style={badgeStyles}>Not started</span>
            </div>
            <div className="mb-1">
                Date: {date} Time: {time}
            </div>
            <div className="mb-1">
                Lecturer: {lecturer} 
            </div>
            
      </div>
    </div>
  );
};

export default TimetableCard;

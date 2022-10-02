import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function LecturerDashboardSmallCard() {
    const now = 60
    
  return (
    <div className='col-2 p-2 ' style={{backgroundColor:"red"}}>
        <div className='d-flex justify-content-between '>
            <div>Total courses</div>
            <div>100</div>
        </div>
        <div>
            vehicles in service
        </div>
        <div>
        <ProgressBar now={now} label={`80%`} visuallyHidden />
        </div>
    </div>
  )
}

export default LecturerDashboardSmallCard
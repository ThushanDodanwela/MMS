import React from 'react'
import LecturerDashboardLargeCard from '../../components/LecturerDashboardLargeCard/LecturerDashboardLargeCard';
import LecturerDashboardSmallCard from '../../components/LecturerDashboardSmallCard/LecturerDashboardSmallCard';

function DashboardLecturer({ setNavbar }) {
    setNavbar("Dashboard");
  return (
    <div>
        <div className='fs-5 fw-semibold mt-3'>
            Hi... Welcome back Suren!
        </div>
        <div className='fs-6 fw-semibold'>
            Here are some details from your schedule.
        </div>

        <div className='d-flex gap-4 mt-3'>
            <LecturerDashboardSmallCard />
            <LecturerDashboardSmallCard />
            <LecturerDashboardSmallCard />
            <LecturerDashboardSmallCard />
            <LecturerDashboardSmallCard />
        </div>
        <div className='mt-3 fs-5 fw-semibold'>All courses</div>
        <div className='mt-3 d-flex flex-wrap'>
            <LecturerDashboardLargeCard />
            <LecturerDashboardLargeCard />
            <LecturerDashboardLargeCard />
        </div>
    </div>
  )
}

export default DashboardLecturer
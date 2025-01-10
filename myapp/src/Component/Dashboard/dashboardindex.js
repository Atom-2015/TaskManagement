import React from 'react'
import AttendanceSection from './componentDashboard/attendanceSection'
import Taskview from './componentDashboard/taskview'
import Projectview from './componentDashboard/projectview'
import ClockDashboard from './componentDashboard/clockDashboard'

function Dashboardindex() {
  return (
    <div className='ml-9  '  >
      <ClockDashboard/>
      {/* <h1 className=' text-white'> Ye Dashboard Hai </h1> */}
      <div className='flex flex-row  justify-between mb-6 mt-[10px] '>
        <Taskview/>
        <Projectview/>
      </div>
      <AttendanceSection/>
    </div>
  )
}

export default Dashboardindex

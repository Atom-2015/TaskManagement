import React from 'react'
import AttendanceSection from './componentDashboard/topthreecomponent'
import Taskview from './componentDashboard/taskview'
import Projectview from './componentDashboard/projectview'

function Dashboardindex() {
  return (
    <div>
      <h1 className=' text-white'> Ye Dashboard Hai </h1>
      <div className='flex flex-row  justify-between '>
        <Taskview/>
        <Projectview/>
      </div>
      <AttendanceSection/>
    </div>
  )
}

export default Dashboardindex

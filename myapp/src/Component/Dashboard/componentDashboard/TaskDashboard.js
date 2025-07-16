import React from 'react'
import Dayslist from '../TaskDashboard/Dayslist'
import WorkStatus from '../TaskDashboard/WorkStatus'
import AssCatSearch from '../TaskDashboard/AssCatSearch'
import Alldetail from '../TaskDashboard/Alldetail'

const TaskDashboard = () => {
  return (
    <div className='text-white'>
        <Dayslist/>
        <WorkStatus/>
        <AssCatSearch/>
        <Alldetail/>
    </div>
  )
}

export default TaskDashboard
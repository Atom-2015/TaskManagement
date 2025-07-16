import React from 'react'
import TimeCard from './TimeCard'
import StaticsCard from './StaticsCard'
import TodayActivityCard from './TodayActivityCard'
import AttendenceList from './AttendenceList'

const UserAttendence = () => {
  return (
    <div className='w-[100%] flex flex-col gap-2'>
        <div className='flex flex-row gap-4 justify-center h-[30%] '>
            <TimeCard/>
            <StaticsCard/>
            <TodayActivityCard />

        </div>
        <div className='ml-12 mr-12'>
            <AttendenceList/>
        </div>
    </div>
  )
}

export default UserAttendence
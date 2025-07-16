import React from 'react'
import CompanyAttendBar from './CompanyAttendBar'
import CompanyAttendGraph from './CompanyAttendGraph'
import CompanyGender from './CompanyGender'
import CompanyAttendenceList from './CompanyAttendenceList'

const CompanyAttendence = () => {
  return (
    <div>
        <div>
            <div><CompanyAttendBar/></div>

            <div className='w-full flex flex-row gap-2 h-[350px]  '>
            <div className='w-full'><CompanyAttendGraph/></div>
            {/* <div className='w-1/4'><CompanyGender/></div> */}
            </div>

            <div className='mt-2'><CompanyAttendenceList/></div>
        </div>
    </div>
  )
}

export default CompanyAttendence
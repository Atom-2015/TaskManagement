import React from 'react'
import { Calendar1 ,CircleGauge,Clock9,UsersRound } from 'lucide-react';

function AttendanceSection() {
  return (
    <div className=' grid grid-cols-4 gap-2  justify-around align-middle  ' >

      <div className=' py-2 px-4 text-[white] font-thin  bg-[#354759]    ' ><span ><b>Attendance</b> </span> <span>This Month</span>
        <div className='flex-grow-1 flex align-items-center justify-center items-center gap-2' >
        <div className='bg-[#fcc100] p-2 rounded-full'><Calendar1 size={18} /></div> 
          <h1 className='text-center text-[22px] font-thin m-0' >
            0/30
          </h1>

        </div>
      </div>
      <div className=' py-2 px-4  text-white font-thin bg-[#354759] '> <span> <b className='font-thin'>Leave Balance</b> </span>
        <div className='flex-grow-1  flex align-items-center justify-center items-center gap-2'>
        <div className='bg-[#6cc788] p-2 rounded-full'><CircleGauge size={18} /></div> 
          <h1 className='text-[22px] font-thin  m-0'>38.5/ 40 </h1>
        </div>


      </div>
      <div className=' py-2 px-4  text-white font-thin  bg-[#354759]  '>
        <h2 className='text-[20px] font-thin m-0'>Punch in / Punch out</h2>
        <div className='flex align-items-center justify-center items-center gap-2'>
        <div className='bg-[#800020] p-2 rounded-full'><Clock9 size={18} /></div> 
        <div className='text-[22px]  m-0'>00:00 hrs</div>
        </div>
      </div>

      <div className=' py-2 px-4 text-white font-thin  bg-[#354759]'>
        <h2 className='text-[20px] font-thin m-0'>Total Users</h2>

        <div className='flex align-items-center justify-center items-center gap-2'>
        <div className='bg-[#2196f3] p-2 rounded-full'><UsersRound size={18} /></div> 
        <div className='text-[22px]  m-0'>22</div>
        </div> 
      </div>
    </div>
  )
}

export default AttendanceSection;

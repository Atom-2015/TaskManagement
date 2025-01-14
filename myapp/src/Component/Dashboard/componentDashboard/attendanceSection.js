import React from 'react'

function AttendanceSection() {
  return (
    <div className=' flex   justify-around align-middle  ' >
      <div className=' py-2 px-4 text-white  bg-[#3d5a80]   rounded ' ><span ><b>Attendance</b> </span> <span>This Month</span> 
      <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
        <h1 className='text-center' >
            0 <span>/30</span>
        </h1>
        
      </div>
      </div>
      <div className=' py-2 px-4  text-white  bg-[#3d5a80]   rounded'> <span className='  ' > <b>Leave Balance</b> </span> 
      <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
       <h1>38.5 <span>/ 40</span> </h1>
      </div>

      
      </div>
      <div className=' py-2 px-4  text-white  bg-[#3d5a80]   rounded'> 
        <h2 className='text-[20px]'>Punch in / Punch out</h2>
        <div></div>    
     </div>

     <div className=' py-2 px-4 text-white  bg-[#3d5a80]  rounded'> 
        <h2 className='text-[20px]'>Total Users</h2>
        <div></div>    
     </div>
    </div>
  )
}

export default AttendanceSection;

import React from 'react'

function Topthreecomponent() {
  return (
    <div className=' flex flex-row  justify-between ' >
      <div className=' w-[18%] bg-red-300 h-[150px] rounded ' ><span ><b>Attendance</b> </span> <span>This Month</span> 
      <div className='flex-grow-1 d-flex align-items-center justify-content-center' >
        <h1 className='text-center' >
            0 <span>/30</span>
        </h1>
        
      </div>
      </div>
      <div className=' w-[38%] bg-red-300 h-[150px] rounded'> <span className='  ' > <b>Leave Balance</b> </span> 
      <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
       <h1>38.5 <span>/ 40</span> </h1>
      </div>
      
      </div>
      <div className=' w-[38%] bg-red-300 h-[150px] rounded'> 
        <h2>Punch in Punch out</h2>
        <div></div>    
     </div>
    </div>
  )
}

export default Topthreecomponent

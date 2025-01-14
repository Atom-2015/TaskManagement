// src/Component/Dashboard/dashboardindex.js

import React ,{useState} from 'react';
import AttendanceSection from './componentDashboard/attendanceSection';
import Taskview from './componentDashboard/taskview';
import Projectview from './componentDashboard/projectview';
import ClockDashboard from './componentDashboard/clockDashboard';
import PieChartt from './piechart';
// import MyPieChart from './componentDashboard/piechart';  // Correct the import path

function Dashboardindex() {
  return (
    <div className='ml-9'>
      <ClockDashboard />
      <AttendanceSection />

         {/* Other components */}
         <div className='flex flex-row justify-between mb-6 mt-[20px]'>
        <Taskview />
        <Projectview />
      </div>

      {/* PieChart Added */}
      <div className="mt-2">
       
        <PieChartt/>
      </div>

   
    </div>
  );
}

export default Dashboardindex;

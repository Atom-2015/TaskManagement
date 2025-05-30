// src/Component/Dashboard/dashboardindex.js

import React ,{useState} from 'react';
import AttendanceSection from './componentDashboard/attendanceSection';
import Taskview from './componentDashboard/taskview';
import Projectview from './componentDashboard/projectview';
import ClockDashboard from './componentDashboard/clockDashboard';
import PieChartt from './charts/piechart';
import GraphChart from './charts/graphchart';
import LineChart from './charts/linechart';
import DonutChart from './charts/donutechart';
import AssignedTask from './componentDashboard/assignedtask'
// import MyPieChart from './componentDashboard/piechart';  // Correct the import path

function Dashboardindex() {
  return (
    <div className='ml-9'>
      <ClockDashboard />
      <AttendanceSection />

         {/* Other components */}
         <div className='mt-2  mb-6 flex flex-row'>
          {/* my pending task */}
          <div className='w-2/4'>
                <div>
                <Taskview />
                </div>

              
        </div>

        {/* Task Assigned By me */}
      
       
      
      </div>
         
      <div className="mt-2 flex  justify-between mb-6 " >
       
      <Projectview />
      <LineChart/>


      </div>

<div className='w-2/4'>  <AssignedTask /></div>
   

   
    </div>
  );
}

export default Dashboardindex;

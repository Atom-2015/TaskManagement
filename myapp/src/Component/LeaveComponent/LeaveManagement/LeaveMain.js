// import React from 'react'

// const LeaveMain = () => {
//   return (
//     <div>LeaveMain</div>
//   )
// }

// export default LeaveMain



import React, { useState } from 'react';
// import Blogfront from '../Management/Blog/blogfront'; // Import Blogfront component
// import Graphfront from '../Overview/graphfront'; // Import graphfront component
// import CompanyManageTable from './CompanyManageTable'; // Import the CompanyManageTable component
// // import Projectionfield from './Addfields/Projectionfields';
// import MainPage from './Addfields/MainPage';
import { Outlet, useNavigate } from 'react-router-dom';

const LeaveMain = () => {
  const [activeTab, setActiveTab] = useState('myl'); // State to manage active tab

  // Render content based on active tab
  
  const navigate = useNavigate()
  return (
    <div className="p-6 bg-gray-900  min-h-screen">
      {/* Buttons at the Top Center */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {navigate('/leaves/Myteamleave'); setActiveTab('companyManagement')} }
          className={`px-6 py-2 rounded-t-lg transition-all ${
            activeTab === 'companyManagement'
              ? 'bg-white text-blue-500 shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
         My Team Leave
        </button>
       
        <button
          onClick={() => {navigate('/leaves/myleave'); setActiveTab('graph')} }
          className={`px-6 py-2 rounded-t-lg transition-all ${
            activeTab === 'graph'
              ? 'bg-white text-purple-500 shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          My Leave
        </button>
        {/* <button
        
          onClick={() => {navigate('/management/mainpage'); setActiveTab('/MainPage')} }
          className={`px-6 py-2 rounded-t-lg transition-all ${
            activeTab === '/MainPage'
              ? 'bg-white text-purple-500 shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Projection Field
        </button> */}
      </div>

      {/* Render Content Based on Active Tab */}
      {/* {renderContent()} */}
      <Outlet/>
    </div>
  );
};

export default LeaveMain;

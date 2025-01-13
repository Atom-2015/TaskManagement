import React from 'react';
import Tasklisting from './tasklisting';
import Addtaskbutton from './addtaskbutton';

function Taskmanagement() {
  return (
    <div className="p-4">
      <h1 className="text-white text-xl font-bold mb-4">Project Management</h1>
      
      {/* Flex container for navigation bar */}
      <div className="flex items-center mb-4">
         
        <Addtaskbutton />
      </div>
      
      {/* Task Listing */}
      <Tasklisting />
    </div>
  );
}

export default Taskmanagement;

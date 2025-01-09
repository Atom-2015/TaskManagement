import React from 'react';
import Tasklisting from './tasklisting';
import Addtaskbutton from './addtaskbutton';

function Taskmanagement() {
  return (
    <div className="p-4">
      <h1 className="text-white text-xl font-bold mb-4">Project Management</h1>
      
      {/* Flex container for project name and button */}
      <div className="flex items-center justify-between mb-4">
        {/* Project Name on the left */}
        <h2 className="text-white text-lg font-semibold">Task Management</h2>
        
        {/* Add Task Button on the right */}
        <Addtaskbutton />
      </div>
      
      {/* Task Listing */}
      <Tasklisting />
    </div>
  );
}

export default Taskmanagement;

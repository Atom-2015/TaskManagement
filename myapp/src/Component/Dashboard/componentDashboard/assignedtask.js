import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assigned_by } from "../../../FeatureRedux/task/taskassignedbymeSlice";
import StatusButton from "./statusbutton"; // Reusing StatusButton component
import { CirclePlus } from 'lucide-react';
import AddAssignedTask from "./AssignedAddtask";


function AssignedTasks() {
  const dispatch = useDispatch();
  const { task, isLoading, isError, errorMessage } = useSelector(
    (state) => state.alltaskcreatedbyme
  );

  const [isModalOpen,setIsModalOpen]=useState(false)
  const toggleModal=()=>setIsModalOpen(!isModalOpen)



  useEffect(() => {
    dispatch(assigned_by());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "In Progress":
        return "bg-yellow-400 text-black";
      case "Pending":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-400 text-black";
    }
  };

  

  return (
    <div className="w-[full] bg-[#354759] p-4 rounded-lg shadow-lg">
      <div className="flex flex-row justify-between">
      <span className=" text-[24px] font-thin mb-3 text-white">Assigned Tasks</span>
      <span className="text-white hover:cursor-pointer" onClick={toggleModal}>{<CirclePlus/>  }</span>
      </div>
      

      {/* Header */}
      <div className="grid grid-cols-7 bg-gray-300 text-gray-700 font-medium text-xs py-2 px-3 rounded-t-md">
        <div>Project</div>
        <div>Task</div>
        <div>Assigned To</div>
        <div>Quantity</div>
        <div>Units</div>
        <div>Progress</div>
        <div>Status</div>
        
      </div>

      {/* Task List */}
      <div className="space-y-2 mt-2  overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="text-center text-gray-300">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500">{errorMessage}</div>
        ) : task.length === 0 ? (
          <div className="text-center text-gray-300">No Tasks Assigned</div>
        ) : (
          task.map((assignedTask, index) => (
            <div
              key={index}
              className="grid grid-cols-7 bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
            >
              <div className="truncate font-medium">
                {assignedTask.project_id?.name || "No Project"}
              </div>
              <div className="truncate font-medium">
                {assignedTask.title || "No Task"}
              </div>
              <div className="truncate text-gray-700">
                {assignedTask.assigned_to || "Not Assigned"}
              </div>
              <div className="truncate text-gray-700">
                {assignedTask.completedUnit}/{assignedTask.totalunit}
              </div>
              <div className="truncate text-gray-700">
                {assignedTask.unittype || "N/A"}
              </div>
              <div className="truncate text-gray-700">
                {((assignedTask.completedUnit / assignedTask.totalunit) * 100).toFixed(2)}%
              </div>
              <div
                className={`truncate font-semibold rounded px-2 py-1 text-center ${getStatusClass(
                  assignedTask.status
                )}`}
              >
                {assignedTask.status || "No Updates"}
              </div>
             
            </div>
          ))
        )}
      </div>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      {isModalOpen && <AddAssignedTask isModalOpen={isModalOpen} closemodal={()=>setIsModalOpen((val)=> !val)} />} 
    </div>
  );
}

export default AssignedTasks;

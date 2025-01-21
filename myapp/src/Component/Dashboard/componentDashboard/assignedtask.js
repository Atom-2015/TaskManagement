import React, { useState, useEffect } from "react"; 
import { useDispatch } from 'react-redux';
import { alltaskuserspecific } from '../../../FeatureRedux/alltaskuserspecific';
import StatusButton from "./statusbutton"; // Reusing StatusButton component

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await dispatch(alltaskuserspecific());
        if (response.payload && Array.isArray(response.payload)) {
          setTasks(response.payload);
        } else {
          console.error("Invalid task data received:", response.payload);
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };
  
    fetchTasks();
  }, [dispatch]); 
  
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "In Progress":
        return "bg-yellow-400 text-black";
      case "Pending":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-black";
    }
  };

  return (
    <div className="w-[50%] bg-[#354759] p-4 rounded-lg shadow-lg">
      <h2 className="text-[24px] font-thin mb-3 text-white">Assigned Tasks</h2>

      {/* Header */}
      <div className="grid grid-cols-8 bg-gray-300 text-gray-700 font-medium text-xs py-2 px-3 rounded-t-md">
        <div>Project</div>
        <div>Task</div>
        <div>Assigned To</div>
        <div>Quantity</div>
        <div>Units</div>
        <div>Progress</div>
        <div>Status</div>
        <div>Update</div>
      </div>

      {/* Task List */}
      <div className="space-y-2 mt-2 h-72 overflow-y-auto custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-300">No Tasks Assigned</div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
            >
              <div className="truncate font-medium">{task.project_id}</div>
              <div className="truncate font-medium">{task.title}</div>
              <div className="truncate text-gray-700">{task.assigned_by}</div>
              <div className="truncate text-gray-700">{task.completedUnit}/{task.totalunit}</div>
              <div className="truncate text-gray-700">{task.unittype}</div>
              <div className="truncate text-gray-700">
                {((task.completedUnit / task.totalunit) * 100).toFixed(2)}%
              </div>
              <div className={`truncate font-semibold rounded px-2 py-1 text-center ${getStatusClass(task.status)}`}>
                {task.status || "No updates"}
              </div>
              <div className="truncate text-center">
                <button className="bg-primary text-white py-1 px-2 rounded">
                  <StatusButton />
                </button>
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
    </div>
  );
}

export default AssignedTasks;

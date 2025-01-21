
import React, { useState, useEffect } from "react"; 
import { useDispatch } from 'react-redux';
import { alltaskuserspecific } from '../../../FeatureRedux/alltaskuserspecific';
import StatusButton from "./statusbutton"; // Importing the new component

function TaskView() {
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
    console.log("hjh")
    switch (status) {
      case "Completed":
        return "bg-green-300 text-green-700";
      case "In Progress":
        return "bg-yellow-300 text-yellow-700";
      case "Pending":
        return "bg-red-300 text-red-700";
      default:
        return "bg-gray-300 text-gray-600";
    }
  };

  const openModal = (task) => {
    console.log(`Opening modal for task: ${task.title}`);
  };

  return (
    <div className="w-[50%] bg-[#354759] p-4 rounded-lg shadow-md">
      <h2 className="text-[25px] font-thin mb-3 text-white">My Task</h2>

      {/* Header */}
      <div className="flex justify-between items-center bg-gray-300 text-gray-700 font-medium text-xs py-2 px-3 rounded-t-md">
        <div className="w-1/4">Project Name</div>
        <div className="w-1/4">Task</div>
        <div className="w-1/4">Assigned By</div>
        <div className="w-1/4">Quantity</div>
        <div className="w-1/4">Units</div>
        <div className="w-1/4">Progress</div>
        <div className="w-1/4 text-center">Status</div>
        <div className="w-1/4 text-center">Today's Update</div>
      </div>

      {/* Task List */}
      <div className="space-y-2 mt-2 h-64 overflow-y-scroll custom-scrollbar">
        {Array.isArray(tasks) && tasks.length === 0 ? (
          <div className="text-center text-gray-600">No Data Found</div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
            >
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.project_id}</div>
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.title}</div>
              <div className="w-1/4 truncate text-gray-600">{task.assigned_by}</div>
              <div className="w-1/4 truncate text-gray-600">{task.completedUnit}/{task.totalunit}</div>
              <div className="w-1/4 truncate text-gray-600">{task.unittype}</div>
              <div className="w-1/4 truncate text-gray-600">
                {((task.completedUnit / task.totalunit) * 100).toFixed(2)}%
              </div>
              {/* Status Button Component */}
           
              <div className={`w-1/4 truncate text-gray-600 rounded ${getStatusClass(task.status)}`}  >{task.status!=''  ? task.status : "No updates"}</div>
              <div className="w-1/4 truncate text-gray-800 font-medium"> <button className="bg-primary rounded font-thin text-white ">  <StatusButton/> </button> </div>
            </div>
          ))
        )}
      </div>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default TaskView;

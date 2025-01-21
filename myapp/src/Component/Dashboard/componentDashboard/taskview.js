import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from 'react-redux';
import { alltaskuserspecific } from '../../../FeatureRedux/alltaskuserspecific';

function TaskView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [units, setUnits] = useState("");
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  // Access tasks from Redux state (with fallback to empty array)
  // const tasks = useSelector((state) => state.alltaskuserspecific?.data || []);  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await dispatch(alltaskuserspecific());
        console.log("Response:", response);
        
        if (response.payload && Array.isArray(response.payload)) {
          setTasks(response.payload);
        } else {
          console.error("Invalid task data received:", response.payload);
          setTasks([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Ensure tasks is always an array
      }
    };
  
    fetchTasks();
  }, [dispatch]); 
  
  const getStatusClass = (status) => {
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
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUnits("");
  };

  const handleSubmit = () => {
    console.log(`Updated units for ${selectedTask?.title}: ${units}`);
    closeModal();
  };

  return (
    <div className="w-[60%] bg-[#354759] p-4 rounded-lg shadow-md">
      <h2 className="text-sm font-semibold mb-3 text-white">Task Overview</h2>

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
              {/* Project Name */}
              <div className="w-1/4 truncate text-gray-800 font-medium">
                {task.project_id} {/* Replace with actual project name if necessary */}
              </div>
              {/* Task Name */}
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.title}</div>
              {/* Assigned By */}
              <div className="w-1/4 truncate text-gray-600">{task.assigned_by}</div>
              {/* Quantity */}
              <div className="w-1/4 truncate text-gray-600">{task.completedUnit}/{task.totalunit}</div>
              {/* Units */}
              <div className="w-1/4 truncate text-gray-600">{task.unittype}</div>
              {/* Progress */}
              <div className="w-1/4 truncate text-gray-600">
                {((task.completedUnit / task.totalunit) * 100).toFixed(2)}%
              </div>
              {/* Status */}
              <button
                className={`w-1/4 text-center text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(task.status)}`}
                onClick={() => openModal(task)}
              >
                {task.status}
              </button>
              {/* Today's Update */}
              <div className="w-1/4 truncate text-gray-600">{task.comments.length > 0 ? task.comments[0] : "No updates"}</div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Update Units for {selectedTask?.title}</h3>
            <input
              type="text"
              placeholder="Enter units"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={closeModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

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

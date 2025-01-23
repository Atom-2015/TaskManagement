import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { alltaskuserspecific } from '../../../FeatureRedux/alltaskuserspecific';
import StatusButton from "./statusbutton"; // Importing the new component

function TaskView() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState('');
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
    setSelectedTask(null);
    setComment('');
  };

  const handleSubmitComment = () => {
    // Add your logic to submit the comment to the task, e.g., API call to save the comment
    console.log("Submitting comment:", comment, "for task:", selectedTask.title);
    // After submitting, close the modal and clear the comment
    closeModal();
  };

  return (
    <div className="w-[full] bg-[#354759] p-4 rounded-lg shadow-md">
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
        <div className="w-1/4 text-center">Add Comment</div>
      </div>

      {/* Task List */}
      <div className="space-y-2 mt-2 overflow-y-scroll custom-scrollbar">
        {Array.isArray(tasks) && tasks.length === 0 ? (
          <div className="text-center text-gray-600">No Data Found</div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
            >
              {/* Task Details */}
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.project_id?.name || 'No Project Name'}</div>
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.title}</div>
              <div className="w-1/4 truncate text-gray-600">{task.assigned_by}</div>
              <div className="w-1/4 truncate text-gray-600">{task.completedUnit}/{task.totalunit}</div>
              <div className="w-1/4 truncate text-gray-600">{task.unittype}</div>
              <div className="w-1/4 truncate text-gray-600">
                {((task.completedUnit / task.totalunit) * 100).toFixed(2)}%
              </div>
              <div className={`w-1/4 truncate px-1 py-1 text-gray-600 rounded ${getStatusClass(task.status)}`}>
                {task.status || "No updates"}
              </div>
              <div className="w-1/4 truncate text-gray-800 font-medium">
                <button className="bg-primary rounded font-thin text-white">
                  <StatusButton taskId={task._id} />
                </button>
              </div>
              <div className="w-1/4">
                <button
                  onClick={() => openModal(task)}
                  className="bg-teal-500 rounded text-white px-2 py-1"
                >
                  Add Comment
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Add Comment to Task: {selectedTask.title}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your comment here..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitComment}
                className="bg-teal-500 text-white px-4 py-2 rounded-md"
              >
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

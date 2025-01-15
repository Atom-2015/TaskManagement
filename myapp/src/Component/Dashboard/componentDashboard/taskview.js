import React from "react";

function TaskView() {
  const tasks = [
    { name: "Task Alpha", assignedBy: "John Doe", deadline: "2025-01-15", status: "In Progress" },
    { name: "Task Beta", assignedBy: "Jane Smith", deadline: "2025-01-20", status: "Completed" },
    { name: "Task Gamma", assignedBy: "Alice Johnson", deadline: "2025-01-18", status: "Pending" },
    { name: "Task Delta", assignedBy: "Bob Brown", deadline: "2025-01-22", status: "In Progress" },
    { name: "Task Omega", assignedBy: "Chris Wilson", deadline: "2025-01-25", status: "Pending" },
  ];

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

  return (
    <div className="w-[49%] bg-[#354759] p-4 rounded-lg shadow-md ">
      <h2 className="text-sm font-semibold mb-3 text-white">Task Overview</h2>

      {/* Header */}
      <div className="flex justify-between items-center bg-gray-300 text-gray-700 font-medium text-xs py-2 px-3 rounded-t-md">
        <div className="w-1/4">Task Name</div>
        <div className="w-1/4">Assigned By</div>
        <div className="w-1/4">Deadline</div>
        <div className="w-1/4 text-center">Status</div>
      </div>

      {/* Task List */}
      <div className="space-y-2 mt-2 h-64 overflow-y-scroll custom-scrollbar">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
          >
            <div className="w-1/4 truncate text-gray-800 font-medium">{task.name}</div>
            <div className="w-1/4 truncate text-gray-600">{task.assignedBy}</div>
            <div className="w-1/4 truncate text-gray-600">{task.deadline}</div>
            <span
              className={`w-1/4 text-center text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            display: none; /* Hides scrollbar for Chrome/Safari */
          }
          .custom-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>
    </div>
  );
}

export default TaskView;

import React from 'react';

function TaskView() {
  const tasks = [
    { name: 'Task Alpha', assignedBy: 'John Doe', deadline: '2025-01-15', status: 'In Progress' },
    { name: 'Task Beta', assignedBy: 'Jane Smith', deadline: '2025-01-20', status: 'Completed' },
    { name: 'Task Gamma', assignedBy: 'Alice Johnson', deadline: '2025-01-18', status: 'Pending' },
    { name: 'Task Delta', assignedBy: 'Bob Brown', deadline: '2025-01-22', status: 'In Progress' },
    { name: 'Task Omega', assignedBy: 'Chris Wilson', deadline: '2025-01-25', status: 'Pending' },
  ];

  return (
    <>
      <div className="w-[49%] bg-gray-100 p-2 rounded-lg shadow-md overflow-hidden h-[300px]">
        <h2 className="text-sm font-semibold mb-2 text-gray-700">Task Overview</h2>
        {/* Header Row */}
        <div className="flex justify-between items-center bg-gray-200 text-gray-600 font-semibold text-xs py-1 px-2 sticky top-0 z-10 rounded-t-md">
          <div className="w-1/4">Task Name</div>
          <div className="w-1/4">Assigned By</div>
          <div className="w-1/4">Deadline</div>
          <div className="w-1/4 text-center">Status</div>
        </div>
        {/* Task List */}
        <div className="space-y-1 h-full overflow-y-scroll custom-scrollbar">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-sm rounded-md p-1 hover:shadow-md transition-shadow text-xs"
            >
              <div className="w-1/4 truncate text-gray-800 font-medium">{task.name}</div>
              <div className="w-1/4 truncate text-gray-500">{task.assignedBy}</div>
              <div className="w-1/4 truncate text-gray-500">{task.deadline}</div>
              <span
                className={`w-1/4 text-center px-2 py-0.5 rounded-full ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-600'
                    : task.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for the Component */}
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
    </>
  );
}

export default TaskView;

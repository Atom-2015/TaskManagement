import React from 'react';

function Tasklisting() {
  const tasks = [
    {
      taskName: 'Design Database Schema',
      status: 'In Progress',
      assignedTo: 'Alice',
      assignedBy: 'Bob',
      deadline: '2025-01-20',
    },
    {
      taskName: 'Develop API Endpoints',
      status: 'Pending',
      assignedTo: 'Charlie',
      assignedBy: 'Alice',
      deadline: '2025-01-25',
    },
    {
      taskName: 'Create Frontend Components',
      status: 'Completed',
      assignedTo: 'Eve',
      assignedBy: 'Diana',
      deadline: '2025-01-18',
    },
    {
      taskName: 'Testing and QA',
      status: 'Not Started',
      assignedTo: 'Bob',
      assignedBy: 'Charlie',
      deadline: '2025-02-01',
    },
  ];

  // Helper function to get the status color
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'In Progress':
        return 'text-blue-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Not Started':
        return 'text-gray-600';
      default:
        return 'text-black';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Task Listing</h1>
      <div className="overflow-x-auto rounded">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded ">
          <thead>
            <tr className="bg-blue-900 ">
              <th className="px-4 py-2 border border-gray-300 text-white ">Task Name</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Status</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Assigned To</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Assigned By</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Deadline</th>
              <th className="px-4 py-2 border border-gray-300 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-900">
                <td className="px-4 py-2 border-b border-gray-300 text-white">{task.taskName}</td>
                <td className={`px-4 py-2 border-b border-gray-300   ${getStatusClass(task.status)}`}>
                  {task.status}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 text-white">{task.assignedTo}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-white">{task.assignedBy}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-white">{task.deadline}</td>
                <td className="px-4 py-2 border-b border-gray-300 text-white">...</td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default Tasklisting;

import React from 'react';

function Projectview() {
  const projects = [
    { name: 'Project Alpha', status: 'In Progress', lead: 'John Doe' },
    { name: 'Project Beta', status: 'Completed', lead: 'Jane Smith' },
    { name: 'Project Gamma', status: 'Pending', lead: 'Alice Johnson' },
    { name: 'Project Delta', status: 'In Progress', lead: 'Bob Brown' },
    { name: 'Project Omega', status: 'Pending', lead: 'Chris Wilson' },
  ];

  return (
    <>
      <div className="w-[49%] bg-gray-100 p-2 rounded-lg shadow-md overflow-hidden border">
        <h2 className="text-sm font-semibold mb-2 text-gray-700">Project Overview</h2>
        {/* Header Row */}
        <div className="flex justify-between items-center bg-gray-200 text-gray-600 font-semibold text-xs py-1 px-2 sticky top-0 z-10 rounded-t-md">
          <div className="w-1/3">Project Name</div>
          <div className="w-1/3">Lead</div>
          <div className="w-1/3 text-center">Status</div>
        </div>
        {/* Project List */}
        <div className="space-y-1 h-full overflow-y-scroll custom-scrollbar">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-sm rounded-md p-1 hover:shadow-md transition-shadow text-xs"
            >
              <div className="w-1/3 truncate text-gray-800 font-medium">{project.name}</div>
              <div className="w-1/3 truncate text-gray-500">  {project.lead}</div>
              <span
                className={`w-1/3 text-center px-2 py-0.5 rounded-full ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-600'
                    : project.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {project.status}
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

export default Projectview;

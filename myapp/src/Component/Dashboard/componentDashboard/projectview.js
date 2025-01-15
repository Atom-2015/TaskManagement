import React from "react";

function Projectview() {
  const projects = [
    { name: "Project Alpha", status: "In Progress", lead: "John Doe" },
    { name: "Project Beta", status: "Completed", lead: "Jane Smith" },
    { name: "Project Gamma", status: "Pending", lead: "Alice Johnson" },
    { name: "Project Delta", status: "In Progress", lead: "Bob Brown" },
    { name: "Project Omega", status: "Pending", lead: "Chris Wilson" },
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
      <h2 className="text-sm font-semibold mb-3 text-white">Project Overview</h2>

      {/* Header */}
      <div className="flex justify-between items-center bg-gray-300 text-gray-700 font-medium text-xs py-2 px-3 rounded-t-md">
        <div className="w-1/3">Project Name</div>
        <div className="w-1/3">Lead</div>
        <div className="w-1/3 text-center">Status</div>
      </div>

      {/* Project List */}
      <div className="space-y-2 mt-2 h-64 overflow-y-scroll custom-scrollbar">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white shadow-sm rounded-md p-2 hover:shadow-lg transition-shadow text-xs"
          >
            <div className="w-1/3 truncate text-gray-800 font-medium">{project.name}</div>
            <div className="w-1/3 truncate text-gray-600">{project.lead}</div>
            <span
              className={`w-1/3 text-center text-xs font-medium px-2 py-1 rounded-full ${getStatusClass(
                project.status
              )}`}
            >
              {project.status}
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

export default Projectview;

import React from "react";
import { useNavigate } from "react-router-dom";

function Projectlist() {
  const projects = [
    { name: "Project A", lead: "Alice", deadline: "2025-01-15", status: "Ongoing" },
    { name: "Project B", lead: "Bob", deadline: "2025-02-01", status: "Completed" },
    { name: "Project C", lead: "Charlie", deadline: "2025-01-30", status: "Delayed" },
    { name: "Project D", lead: "Diana", deadline: "2025-03-10", status: "Ongoing" },
    { name: "Project E", lead: "Eve", deadline: "2025-01-25", status: "Pending" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-300 text-green-800";
      case "Delayed":
        return "bg-red-300 text-red-800";
      case "Pending":
        return "bg-yellow-300 text-yellow-800";
      case "Ongoing":
        return "bg-blue-300 text-blue-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const navigate = useNavigate();

  const navigateToIssues = () => {
    navigate("/tasks/alltask");
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-thin text-white mb-4">Project List</h1>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.length !== 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className=" shadow-[0px_0px_2px_1px_gray]  transition-transform transform hover:scale-105 hover:shadow-md"
            >
              {/* Header with Project Name */}
              <div
                className="bg-[#354759] p-3 border-b cursor-pointer"
                onClick={navigateToIssues}
              >
                <h2 className="text-lg font-semibold text-white">
                  {project.name}
                </h2>
              </div>
              {/* Project Details Table */}
              <div className="p-2 bg-[#354759]">
                <table className="w-full bg-[#354759] table-fixed text-sm text-center text-white">
                  <thead>
                    <tr>
                      <th className="pb-2 font-thin">Project Head</th>
                      <th className="pb-2 font-thin">Deadline</th>
                      <th className="pb-2 font-thin">Team</th>
                      <th className="pb-2 font-thin">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">{project.lead}</td>
                      <td className="py-1">{project.deadline}</td>
                      <td className="py-1">Team A</td>
                      <td className={`py-1 px-2 rounded-md font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-500 col-span-full">
            Project list is empty
          </h2>
        )}
      </div>
    </div>
  );
}

export default Projectlist;

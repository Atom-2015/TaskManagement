import React from "react";
import { useNavigate } from 'react-router-dom';

function Projectlist() {
  const projects = [
    { name: "Project A", lead: "Alice", deadline: "2025-01-15", status: "Ongoing" },
    { name: "Project B", lead: "Bob", deadline: "2025-02-01", status: "Completed" },
    { name: "Project C", lead: "Charlie", deadline: "2025-01-30", status: "Delayed" },
    { name: "Project D", lead: "Diana", deadline: "2025-03-10", status: "Ongoing" },
    { name: "Project E", lead: "Eve", deadline: "2025-01-25", status: "Pending" },
  ];

  // Function to return the appropriate border color based on project status
  const getStatusBorderColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-green-600";
      case "Delayed":
        return "border-red-600";
      case "Pending":
        return "border-yellow-600";
      case "Ongoing":
        return "border-blue-600";
      default:
        return "border-gray-600"; // Default color in case of an unknown status
    }
  };
  const navigate = useNavigate()

  const navigatetoissues = ()=>{
    navigate("/tasks/alltask")
  }

  return (
    <div className="p-4">
       
      <div className="overflow-x-auto">
        {projects.length !== 0 ? (
          projects.map((project, index) => (
            <div key={index} className="mb-6 rounded  ">
              {/* Project Name with dynamic left border color */}
              <div  className={`bg-[#808080] rounded border-l-4 shadow-md ${getStatusBorderColor(project.status)}`}>
                <div className={`w-full text-left pl-2 text-white font-bold text-lg border-b border-gray-300`} onClick={navigatetoissues} >
                  {project.name}
                </div>

                {/* Table with project details */}
                <table className="table-fixed w-full  text-left">
                  <thead>
                    <tr className="">
                      <th className="text-white px-2 py-0 w-1/5 border-r border-gray-300">Project Head</th>
                      <th className="text-white px-2 py-0 w-1/5 border-r border-gray-300">Start Date</th>
                      <th className="text-white px-2 py-0 w-1/5 border-r border-gray-300">End Date</th>
                      <th className="text-white px-2 py-0 w-1/5 border-r border-gray-300">Team</th>
                      <th className="text-white px-2 py-0 w-1/5    ">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-white px-2 py-0 border-r border-gray-300">{project.lead}</td>
                      <td className="text-white px-2 py-0 border-r border-gray-300">2024-01-01</td>
                      <td className="text-white px-2 py-0 border-r border-gray-300">{project.deadline}</td>
                      <td className="text-white px-2 py-0 border-r border-gray-300">Team A</td>
                      <td
                        className={`px-2 py-0 ${
                          project.status === "Completed"
                            ? "text-green-600"
                            : project.status === "Delayed"
                            ? "text-red-600"
                            : project.status === "Pending"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {project.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500">Project list is empty</h1>
        )}
      </div>
    </div>
  );
}

export default Projectlist;

 
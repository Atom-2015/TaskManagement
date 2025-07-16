


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { projectlist } from "../../FeatureRedux/projectlistSlice";
import moment from "moment"; 

function Projectlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get projects from Redux
  const { projects, isLoading, isError, errorMessage } = useSelector(
    (state) => state.projectlist
  );

  // States for filters & views
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid");

  useEffect(() => {
    dispatch(projectlist({})); 
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-300 text-green-800";
      case "On Hold":
        return "bg-red-300 text-red-800";
      case "Active":
        return "bg-blue-300 text-blue-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const navigateToIssues = (projectid) => {
    localStorage.setItem("Projectid", projectid);
    navigate("/tasks/alltask");
  };

  // Filtered projects based on selection
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.status === filter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-thin text-white mb-4">Project List</h1>

      {/* Filter and View Toggle */}
      <div className="flex justify-between items-center mb-4">
        {/* Dropdown Filter */}
        <select
          className="p-2 bg-gray-800 text-white rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        {/* View Toggle Buttons */}
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-md ${view === "grid" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setView("grid")}
          >
            Grid View
          </button>
          <button
            className={`p-2 rounded-md ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      {/* Show loading or error messages */}
      {isLoading && <p className="text-center text-yellow-500">Loading projects...</p>}
      {isError && <p className="text-center text-red-500">{errorMessage}</p>}

      {/* Project Display */}
      {filteredProjects.length > 0 ? (
        <div className={view === "grid" ? "grid gap-4 lg:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="shadow-[0px_0px_2px_1px_gray] transition-transform transform hover:scale-105 hover:shadow-md"
            >
              {/* Header with Project Name & Logo */}
              <div
                className="bg-[#354759] p-3 border-b flex items-center space-x-3 cursor-pointer"
                onClick={() => navigateToIssues(project._id)}
              >
                {/* Small Company Logo */}
                <img
                  src={project.logo || "default-logo.png"} 
                  alt="Company Logo"
                  className="w-8 h-8 rounded-full"
                />
                <h2 className="text-lg font-semibold text-white">{project.name}</h2>
              </div>

              {/* Project Details Table */}
              <div className="p-2 bg-[#354759]">
                <table className="w-full bg-[#354759] table-fixed text-sm text-center text-white">
                  <thead>
                    <tr>
                      <th className="pb-2 font-thin">Project Head</th>
                      <th className="pb-2 font-thin">Start Date</th>
                      <th className="pb-2 font-thin">Deadline</th>
                      <th className="pb-2 font-thin">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">{project.lead || "N/A"}</td>
                      <td className="py-1">{project.team || "Team A"}</td>
                      <td className="py-1">{project.end_date ? moment(project.end_date).format("DD MMM YYYY") : "N/A"}</td>
                      <td className={`py-1 px-2 rounded-md font-semibold ${getStatusColor(project.status)}`}>
                        {project.status || "Unknown"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <h2 className="text-center text-gray-500">No projects found</h2>
      )}
    </div>
  );
}

export default Projectlist;

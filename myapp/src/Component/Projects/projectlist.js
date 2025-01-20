import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { projectlist } from "../../FeatureRedux/projectlistSlice";
import moment from "moment"; // Import moment

function Projectlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state values from Redux
  const { projects, isLoading, isError, errorMessage } = useSelector(
    (state) => state.projectlist
  );

  // Fetch projects when component loads
  useEffect(() => {
    const formData = {}; // Replace with actual formData if needed
    dispatch(projectlist(formData));
  }, [dispatch]);

  // Utility to determine the status badge color
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

  // Navigate to the tasks page
  const navigateToIssues = (projectid) => {
    localStorage.setItem('Projectid',projectid)
     
      navigate("/tasks/alltask", ); // Correctly passing projectId
    
    
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-thin text-white mb-4">Project List</h1>

      {/* Show loading or error messages */}
      {isLoading && (
        <p className="text-center text-yellow-500">Loading projects...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}

      {/* Display project cards */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {!isLoading && !isError && projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="shadow-[0px_0px_2px_1px_gray] transition-transform transform hover:scale-105 hover:shadow-md"
            >
              {/* Header with Project Name */}
              <div
                className="bg-[#354759] p-3 border-b cursor-pointer"
                onClick={()=>navigateToIssues(project._id)}
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
                      <td className="py-1">{project.lead || "N/A"}</td>
                      {/* Format the end_date */}
                      <td className="py-1">
                        {project.end_date
                          ? moment(project.end_date).format("DD MMM YYYY")
                          : "N/A"}
                      </td>
                      <td className="py-1">{project.team || "Team A"}</td>
                      <td
                        className={`py-1 px-2 rounded-md font-semibold ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status || "Unknown"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          !isLoading && (
            <h2 className="text-center text-gray-500 col-span-full">
              Project list is empty
            </h2>
          )
        )}
      </div>
    </div>
  );
}

export default Projectlist;

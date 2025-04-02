import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectlist } from "../../FeatureRedux/projectlistSlice";
import moment from "moment";
import { FaFilter } from "react-icons/fa"; // Import a filter icon
import { FaEye } from "react-icons/fa";
import ProjectViewList from "./ProjectViewList";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


function ProjectList1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projectlist);
  console.log(`Projects: ${JSON.stringify(projects)}`);

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState({ field: "id", order: "asc" }); // Track sorting field and order
  const searchInputRef = useRef(null);




  const modalRef = useRef(null);

  // Fetch projects on mount
  useEffect(() => {
    dispatch(projectlist({}));
  }, [dispatch]);

  // Add originalIndex to projects when data is loaded
  useEffect(() => {
    if (projects.length > 0) {
      const projectsWithIndex = projects.map((project, index) => ({
        ...project,
        originalIndex: index + 1, // Add sequential number
      }));


      const sortedProjects = projectsWithIndex.reverse()
      setFilteredProjects(sortedProjects);
    }
  }, [projects]);

  // Apply filtering and sorting together
  useEffect(() => {
    if (filteredProjects.length > 0) {
      let updatedProjects = [...filteredProjects];

      // // Filter based on search term
      // if (searchTerm.trim() !== "") {
      //   updatedProjects = updatedProjects.filter((proj) =>
      //     proj.name.toLowerCase().includes(searchTerm.toLowerCase())
      //   );
      // }

      // Sorting logic
      if (sortOrder.field === "id") {
        // Sort by originalIndex (sequential numbers)
        updatedProjects.sort((a, b) => {
          return sortOrder.order === "asc"
            ? a.originalIndex - b.originalIndex
            : b.originalIndex - a.originalIndex;
        });
      } else if (sortOrder.field === "name") {
        // Sort by project name
        updatedProjects.sort((a, b) => {
          return sortOrder.order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
      }

      setFilteredProjects(updatedProjects);
      console.log("Sorted Projects:", updatedProjects);
    }
  }, [searchTerm, sortOrder]);

  // Toggle sorting order for a specific field
  const toggleSort = (field) => {
    setSortOrder((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  useEffect(() => {
    let updatedProjects = [...projects];


    if (searchTerm.trim() !== "") {
      const searching = searchTerm.toLowerCase();

      updatedProjects = updatedProjects.filter((proj) => searching.split(".").every((char) => proj.name.toLowerCase().includes(char)))
    }

    setFilteredProjects(updatedProjects);

  }, [searchTerm, projects])

  // Close search input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchVisible(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      {isOpen || (
        <div className="fixed z-10 p-4 ml-[-20px] rounded-lg w-[100%] flex justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-md rounded-lg w-[100%] flex flex-col h-auto">
            <div className="p-4 h-auto z-10 flex-grow overflow-x-auto overflow-y-auto" style={{ maxHeight: "600px" }}>
              <table className="w-full border border-collapse border-gray-400">
                <thead>
                  <tr className="bg-slate-50 text-gray-800">
                    <th
                      className="border border-gray-400 px-4 py-1 cursor-pointer"
                      onClick={() => toggleSort("id")}
                    >
                      <div className="flex items-center justify-between">
                        <span>ID</span>
                        <span className="ml-1">
                          {sortOrder.field === "id" && (sortOrder.order === "asc" ? "▲" : "▼")}
                        </span>
                      </div>
                    </th>
                    <th className="border border-gray-400 px-4 py-1 relative">
                      <div className="flex items-center justify-between">
                        <span>Project Name</span>
                        <button
                          onClick={() => setIsSearchVisible(!isSearchVisible)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <FaSearch className="text-gray-600" />
                        </button>
                      </div>
                      {isSearchVisible && (
                        <div ref={searchInputRef} className="absolute top-10 left-0 w-full bg-white z-10 p-2 shadow-lg">
                          <input
                            type="text"
                            placeholder="Search by Project Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        </div>
                      )}
                    </th>
                    <th className="border border-gray-400 px-4 py-1">Status</th>
                    <th className="border border-gray-400 px-4 py-1">Tasks</th>
                    <th className="border border-gray-400 px-4 py-1">Start Date</th>
                    <th className="border border-gray-400 px-4 py-1">End Date</th>
                    <th className="border border-gray-400 px-4 py-1">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">
                        No projects found.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <tr key={project._id?.toString()} className="border border-gray-400 bg-white hover:bg-gray-100">
                        <td className="px-4 py-2 border border-gray-400">{index+1}</td>
                        <td className="border bg-white border-gray-50 p-1 text-start relative font-semibold">
                          <div
                            className="flex justify-between items-center cursor-pointer whitespace-nowrap relative"
                            onMouseEnter={(e) => e.currentTarget.querySelector('button').classList.replace('opacity-0', 'opacity-100')}
                            onMouseLeave={(e) => e.currentTarget.querySelector('button').classList.replace('opacity-100', 'opacity-0')}
                          >
                            <span className="flex-1 truncate">{project.name}</span>
                            <button
                              className="absolute right-0 px-2 text-sm ml-2 text-blue-600 border-2 border-purple-600 rounded-lg opacity-0 transition-opacity duration-200"
                              onClick={() => navigate(`/project/${project._id}`)}
                            >
                              <span>View Project</span>
                            </button>
                          </div>
                        </td>

                        <td className="px-4 py-2 border border-gray-400">
                          <select
                            className={`px-2 py-1 w-full outline-none rounded text-white cursor-pointer ${project.status === "Active"
                              ? "bg-green-500"
                              : project.status === "In Progress"
                                ? "bg-blue-500"
                                : project.status === "Completed"
                                  ? "y-500"
                                  : "bg-red-500"
                              }`}
                            value={project.status}
                            onChange={(e) => {
                              // Handle status update logic here
                            }}
                          >
                            <option value="Active" className="bg-green-500">
                              Active
                            </option>
                            <option value="In Progress" className="bg-blue-500">
                              In Progress
                            </option>
                            <option value="Completed" className="bg-gray-500">
                              Completed
                            </option>
                          </select>
                        </td>
                        <td className="px-4 py-2 border border-gray-400">
                          <div className="relative w-full h-[8px] bg-gray-300 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-green-500 transition-all duration-500"
                              style={{
                                width: `${(project.tasks /
                                  Math.max(...filteredProjects.map((p) => p.tasks), 10)) *
                                  100
                                  }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2 border border-gray-400">
                          {moment(project.start_date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-4 py-2 border border-gray-400">
                          {moment(project.end_date).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-4 py-2 border border-gray-400">
                          {moment(project.end_date).diff(moment(project.start_date), "days")} Days remaining
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList1;
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alltasks } from "../../FeatureRedux/subtaskSlice";

function Tasklisting() {
  const dispatch = useDispatch();
  const { isLoading, isError, data: tasks, errorMessage } = useSelector(
    (state) => state.subtasklist
  );

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null); // Reference to the dropdown menu

  useEffect(() => {
    dispatch(alltasks());
  }, [dispatch]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null); // Close menu when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "In Progress":
        return "text-blue-600";
      case "Pending":
        return "text-yellow-600";
      case "Not Started":
        return "text-gray-600";
      default:
        return "text-black";
    }
  };

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const renderActions = (task, index) => (
    <div className="relative inline-block">
      <button
        onClick={() => handleMenuToggle(index)}
        className="text-white hover:text-white"
        aria-expanded={openMenuIndex === index}
      >
        ⋮
      </button>
      {openMenuIndex === index && (
        <div
          ref={menuRef} // Attach the reference here
          className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-md z-10 whitespace-nowrap"
        >
          <button
            onClick={() => console.log("Editing task:", task)}
            className="block w-full text-black text-left px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => console.log("Deleting task:", task)}
            className="block w-full text-black text-left px-4 py-2 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-[#354759] rounded shadow-md">
      <h1 className="text-2xl font-thin text-white mb-6">Sub Task Listing</h1>
      <div className="">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#354759]">
              {[
                "Task Name",
                "Status",
                "Assigned To",
                "Assigned By",
                "Deadline",
                "Quantity",
                "Units",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 border border-gray-200 text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 px-4 py-2"
                >
                  Loading tasks...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-red-500 px-4 py-2"
                >
                  {errorMessage || "Failed to fetch tasks."}
                </td>
              </tr>
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.title}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-200 ${getStatusClass(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.assigned_to}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.assigned_by}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.due_date}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.totalunit}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {task.unittype}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-white">
                    {renderActions(task, index)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 px-4 py-2"
                >
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasklisting;

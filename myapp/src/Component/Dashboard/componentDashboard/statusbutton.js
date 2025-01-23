import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../FeatureRedux/task/updatetaskSlice"; // Import your update action

const StatusButton = ({ taskId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set initial state for completedUnit and status
  const [updateData, setUpdateData] = useState({
    completedUnit: 0, // Default value for completedUnit
    status: "pending", // Default value for status
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Dispatch the update action with taskId and the updated fields
    dispatch(updateTask({
      taskId, // Use the taskId prop received
      completedUnit: updateData.completedUnit, 
      status: updateData.status,
    }));

    toggleModal(); // Close the modal
  };

  return (
    <div>
      {/* Update Task Button */}
      <button
        className="text-center text-xs font-[14px] px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        onClick={toggleModal}
      >
        Update Task
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg p-4 w-[40%] shadow-[0px_0px_10px_0px_gray]">
            <h2 className="text-xl font-bold text-white mb-4">Update Task</h2>

            {/* Form */}
            <form onSubmit={handleFormSubmit}>
              {/* Completed Units */}
              <div className="mb-4">
                <label
                  htmlFor="completedUnit"
                  className="block text-gray-300 mb-2"
                >
                  Completed Units
                </label>
                <input
                  type="number"
                  id="completedUnit"
                  name="completedUnit"
                  value={updateData.completedUnit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter completed units"
                />
              </div>

          

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusButton;

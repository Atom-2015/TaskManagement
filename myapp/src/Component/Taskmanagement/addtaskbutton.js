import React, { useState } from 'react';

function Addtaskbutton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={toggleModal}
      >
        Add Task
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg w-11/12 max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>
            
            {/* Form */}
            <form>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="taskName">
                  Task Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter task name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="assignedTo">
                  Assigned To
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter assignee's name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="deadline">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-4">
                {/* Cancel Button */}
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtaskbutton;

import React, { useState } from "react";
import image from '../Media/marina.jpg'

function AddProjectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Project
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div>
            
          </div>
          <div className="bg-gray-800 text-white p-6 rounded shadow-lg ">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form>

              <div className="flex justify-center gap-3">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Project Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Project Lead</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Project Cost</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>

              </div>

              <div className="flex justify-center gap-3">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Client Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Client Logo</label>
                  <input
                    type=""
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Location</label>
                  <input
                    type=""
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>
              </div>






              <div className="flex justify-center gap-3">

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Upload KML</label>
                  <input
                    type=""
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">Upload Work Order</label>
                  <input
                    type=""
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project lead"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>


              </div>



              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectButton;

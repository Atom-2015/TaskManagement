

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProject } from "../../FeatureRedux/projectCreation";  
import yourImage from "../Media/task.jpg"; // Import your image here

function AddProjectButton() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    team_members: [],
    status: "",
    budget: "",
  });

  // Access state from Redux store
  const { isLoading, isError, errorMessage, isAdded } = useSelector(
    (state) => state.AddProject // Matches the key in the store
  );

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProject(formData)); // Dispatch action with form data
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
          <div className="flex bg-[#1F2833] text-white p-4 rounded shadow-[0px_0px_10px_0px_gray] items-center justify-center align-middle  ">
            {/* Image Section */}
            <div className="w-[250px]">
              <img src={yourImage} alt="Project Image" className="w-full h-auto rounded-md" />
            </div>

       {/* Form Section */}
<div className="pl-6">
  <h2 className="text-xl font-bold mb-4">Create New Project</h2>
  <form onSubmit={handleSubmit}>
    
    <div className="flex gap-4">
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">Project Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter project name"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Enter description"
        />
      </div>
    </div>

    <div className="flex gap-4">
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">Start Date</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">End Date</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="flex gap-4">
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
          required
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2 font-medium">Budget</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="w-full h-[40px] px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
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
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </div>
  </form>
  
  {isError && <p className="text-red-500 mt-4">{errorMessage}</p>}
  {isAdded && <p className="text-green-500 mt-4">Project added successfully!</p>}
</div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectButton;

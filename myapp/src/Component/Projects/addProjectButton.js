import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProject } from "../../FeatureRedux/projectCreation";
import { allUser } from "../../FeatureRedux/alluserSlice";
import ProjectImage from "../Media/task.jpg"; // Import your image

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

  const { isLoading, isError, errorMessage, isAdded } = useSelector((state) => state.AddProject);
  const userlist = useSelector((state) => state.allUser.users);

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserSelection = (e) => {
    const selectedUser = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      team_members: [...prevState.team_members, selectedUser],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProject(formData));
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1F2833] text-white p-6 rounded-lg shadow-lg w-[90%] max-w-7xl">
            <h2 className="text-xl font-bold mb-3 text-center">Create New Project</h2>

            <div className="flex gap-6">
              {/* Left Side: Image */}
              <div className="flex justify-center items-center w-1/4">
                <img src={ProjectImage} alt="Project" className="w-[90px] rounded-lg shadow-lg" />
              </div>

              {/* Right Side: Form */}
              <div className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-row gap-4">
                  {/* First Row: Project Name, Budget, Start Date, End Date */}
                  <div className="flex flex-row gap-4">
                    <div className="w-1/5">
                      <label className="block font-medium">Project Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">Budget</label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Second Row: Description, Project Head, Status, Company Logo */}
                  <div className="flex flex-row  gap-4">
                    <div className="w-1/5">
                      <label className="block font-medium">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter project description"
                        rows="1"
                      />
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">Project Head</label>
                      <select
                        onChange={handleUserSelection}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                      >
                        <option value="">Select a user</option>
                        {userlist &&
                          userlist.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </select>
                      <div className="mt-2">
                        {formData.team_members.map((member) => (
                          <span
                            key={member}
                            className="inline-block bg-gray-600 text-white px-2 py-1 rounded mr-2"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                    <div className="w-1/5">
                      <label className="block font-medium">Company Logo</label>
                      <input
                        type="file"
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex  justify-end h-8  gap-4 mt-4">
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
        </div>
      )}
    </div>
  );
}

export default AddProjectButton;
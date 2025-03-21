import React, { useState, useEffect } from "react";

function AddMember({ isModalOpen, closemodal }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    manager: "",
    password: "",
    role: "",
    access: false, // Added access state for the toggle
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle toggle for access (checkbox)
  const handleAccessChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      access: e.target.checked, // Toggle access value (true/false)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    // Close modal when click outside of modal content (optional)
    const handleClickOutside = (e) => {
      if (e.target === e.currentTarget) {
        closemodal();
      }
    };

    if (isModalOpen) {
      document.body.addEventListener("click", handleClickOutside);
    } else {
      document.body.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, closemodal]);

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-1250 bg-black bg-opacity-50">
          <div className="bg-[#1F2833] text-white p-6 rounded-lg shadow-lg w-[80%] max-w-4xl">
            <h2 className="text-xl font-bold mb-3 text-center">Add Member</h2>
            <div className="flex align-middle items-center justify-center gap-6">
              <div className="w-2/3">
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-4 align-middle items-center justify-center mt-2 ">
                    <div className="w-[48%] ">
                      <label className="block font-medium">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="w-[48%]">
                      <label className="block font-medium">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 align-middle items-center justify-center mt-3">
                    <div className="w-full">
                      <label className="block font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 align-middle items-center justify-center  mt-3">
                    <div className="w-full">
                      <label className="block font-medium">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="w-full  mt-3">
                    <label className="block font-medium">Reporting Manager</label>
                    <select
                      name="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose project manager</option>
                      <option value="manager1">Manager 1</option>
                      <option value="manager2">Manager 2</option>
                      <option value="manager3">Manager 3</option>
                    </select>
                  </div>

                  <div className="flex gap-2 align-middle items-center justify-center  mt-3">
                    <div className="w-full">
                      <label className="block font-medium">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 align-middle items-center justify-center  mt-3">
                    <div className="w-full">
                      <label className="block font-medium">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="inline-flex justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        name="access"
                        checked={formData.access}
                        onChange={handleAccessChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">Access</span>
                    </label>
                  </div>

                  <div className="w-full flex justify-end gap-4 mt-2">
                    <button
                      type="button"
                      onClick={closemodal}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMember;

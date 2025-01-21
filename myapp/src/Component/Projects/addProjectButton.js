// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AddProject } from "../../FeatureRedux/projectCreation"; 
// import {allUser} from '../../FeatureRedux/alluserSlice' ;

// function AddProjectButton() {
//   const dispatch = useDispatch();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//     team_members: [],
//     status: "",
//     budget: "",
//   });

//   // Access state from Redux store
//   const { isLoading, isError, errorMessage, isAdded } = useSelector(
//     (state) => state.AddProject // Matches the key in the store
//   );

//   // Function to toggle the modal visibility
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(AddProject(formData)); // Dispatch action with form data
//   };


//   const userlist = useSelector((state)=>state.allUser.users);

//   useEffect(()=>{
//     const response = dispatch(allUser());
//   },[])

//   return (
//     <div>
//       {/* Button to open the modal */}
//       <button
//         onClick={toggleModal}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//       >
//         Add Project
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-[#1F2833] text-white p-6 rounded shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Create New Project</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-wrap gap-3">
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Project Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                     placeholder="Enter project name"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                     placeholder="Enter project description"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Start Date</label>
//                   <input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">End Date</label>
//                   <input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Status</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                     required
//                   >
//                     <option value="">Select Status</option>
//                     <option value="Active">Active</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                   </select>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Budget</label>
//                   <input
//                     type="number"
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Creating..." : "Create"}
//                 </button>
//               </div>
//             </form>
//             {isError && <p className="text-red-500 mt-4">{errorMessage}</p>}
//             {isAdded && <p className="text-green-500 mt-4">Project added successfully!</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddProjectButton;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProject } from "../../FeatureRedux/projectCreation"; 
import { allUser } from "../../FeatureRedux/alluserSlice";

function AddProjectButton() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    team_members: [], // Array to hold selected team members
    status: "",
    budget: "",
  });

  // Access state from Redux store
  const { isLoading, isError, errorMessage, isAdded } = useSelector(
    (state) => state.AddProject // Matches the key in the store
  );

  const userlist = useSelector((state) => state.allUser.users); // Get users from Redux

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle user selection
  const handleUserSelection = (e) => {
    const selectedUser = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      team_members: [...prevState.team_members, selectedUser], // Add selected user to team_members array
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProject(formData));
  };

  // Fetch user list
  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

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
          <div className="bg-[#1F2833] text-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-3">
                {/* Project Name */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                {/* Description */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter project description"
                  />
                </div>
                {/* Start Date */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
                {/* End Date */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                {/* Team Members */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Assign To</label>
                  <select
                    onChange={handleUserSelection}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    <option value="">Select a user</option>
                    {userlist &&
                      userlist.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                  {/* Display selected team members */}
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
                {/* Status */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                {/* Budget */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Budget</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
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
      )}
    </div>
  );
}

export default AddProjectButton;
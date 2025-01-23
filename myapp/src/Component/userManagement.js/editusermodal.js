// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPencil } from '@fortawesome/free-solid-svg-icons';

// const EditUserModal = ({ formData, dispatch }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [localFormData, setLocalFormData] = useState({ ...formData });

//     const toggleModal = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLocalFormData({ ...localFormData, [name]: value });
//     };

//     const handleSave = () => {
//         dispatch({
//             type: 'UPDATE_USER', // replace with your action type
//             payload: localFormData,
//         });
//         toggleModal();
//     };

//     return (
//         <div>
//             {/* Pencil Icon for Edit */}
//             <button onClick={toggleModal} className="text-blue-500 hover:text-blue-700">
//                Edit
//             </button>

//             {/* Modal */}
//             {isOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
//                     <div className="bg-gray-800 text-white rounded-lg p-6 w-96">
//                         <h2 className="text-xl font-bold mb-4">Edit Fields</h2>

//                         {/* Name Field */}
//                         <div className="mb-4">
//                             <label className="block text-gray-300 font-medium mb-2">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={localFormData.name}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter Name"
//                                 className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                 required
//                             />
//                         </div>

//                         {/* Email Field */}
//                         <div className="mb-4">
//                             <label className="block text-gray-300 font-medium mb-2">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={localFormData.email}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter Email"
//                                 className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                 required
//                             />
//                         </div>

//                         {/* Role Dropdown */}
//                         <div className="mb-4">
//                             <label className="block text-gray-300 font-medium mb-2">Role</label>
//                             <select
//                                 name="role"
//                                 value={localFormData.role}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                 required
//                             >
//                                 <option value="" disabled>Select a role</option>
//                                 <option value="Employee">Employee</option>
//                                 <option value="Manager">Manager</option>
//                                 <option value="Admin">Admin</option>
//                             </select>
//                         </div>

//                         {/* Password Field */}
//                         <div className="mb-4">
//                             <label className="block text-gray-300 font-medium mb-2">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={localFormData.password}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter Password"
//                                 className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                             />
//                         </div>

//                         {/* Status Dropdown */}
//                         <div className="mb-4">
//                             <label className="block text-gray-300 font-medium mb-2">Status</label>
//                             <select
//                                 name="status"
//                                 value={localFormData.status}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                             >
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                                 <option value="Pending">Pending</option>
//                             </select>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 onClick={toggleModal}
//                                 className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSave}
//                                 className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EditUserModal;






import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../FeatureRedux/user/updateUser_slice'; // Import the action

const EditUserModal = ({ formData }) => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.user); // Access reducer state

    const [isOpen, setIsOpen] = useState(false);
    const [localFormData, setLocalFormData] = useState({ ...formData });

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({ ...localFormData, [name]: value });
    };

    const handleSave = () => {
        console.log("savbed clicked")
        console.log(localFormData)
        dispatch(updateUser({ userId: localFormData._id, updatedData: localFormData }));
        if (!loading && success) {
            setTimeout(toggleModal, 1000); // Close modal on success
        }
    };

    return (
        <div>
            {/* Button to Open Modal */}
            <button onClick={toggleModal} className="text-blue-500 hover:text-blue-700">
                Edit
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>

                        {/* Error or Success Messages */}
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        {success && <p className="text-green-500 mb-2">{success}</p>}

                        {/* Name Field */}
                        <div className="mb-4">
                            <label className="block text-gray-300 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={localFormData.name || ''}
                                onChange={handleInputChange}
                                placeholder="Enter Name"
                                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label className="block text-gray-300 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={localFormData.email || ''}
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div className="mb-4">
                            <label className="block text-gray-300 font-medium mb-2">Role</label>
                            <select
                                name="role"
                                value={localFormData.role || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                            >
                                <option value="" disabled>
                                    Select a Role
                                </option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label className="block text-gray-300 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={localFormData.password || ''}
                                onChange={handleInputChange}
                                placeholder="Enter New Password"
                                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-4">
                            <label className="block text-gray-300 font-medium mb-2">Status</label>
                            <select
                                name="status"
                                value={localFormData.status || ''}
                                onChange={handleInputChange}
                                className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={toggleModal}
                                disabled={loading}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className={`px-4 py-2 rounded ${
                                    loading
                                        ? 'bg-blue-300'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditUserModal;

 


// import React, { useState } from "react";
// import { useDispatch } from 'react-redux'; // Move this import to the top
// import { addUser } from '../../FeatureRedux/adduserSlice'; // Corrected import

// function AdduserButton() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         role: "",
//         status: "Active",
//         password: "",
//     });

//     // Move useDispatch here
//     const dispatch = useDispatch();

//     // Function to handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Function to handle form submission
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log("New User Created:", formData);
        
//         // Dispatching the action after form submission
//         dispatch(addUser(formData));

//         setIsModalOpen(false); // Close the modal after submission
//     };

//     return (
//         <div>
//             {/* Add User Button */}
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
//             >
//                 Add User
//             </button>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
//                     <div className="bg-gray-900 text-white rounded-lg shadow-lg  p-6">
//                         <h2 className="text-xl font-bold mb-4">Create New User</h2>

//                         {/* User Creation Form */}
//                         <form onSubmit={handleFormSubmit}>

//                             <div className="flex justify-between align-middle items-center gap-2">
//                             <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                     Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                     required
//                                 />
//                             </div>
//                             </div>


//                             <div className="flex justify-between align-middle items-center gap-2">

//                             <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                 Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                     Role
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="role"
//                                     value={formData.role}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                     required
//                                 />
//                             </div>

//                             </div>









//                             <div className="flex justify-between align-middle items-center gap-2">
//                             <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                     Status
//                                 </label>
//                                 <select
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                 >
//                                     <option value="Active">Active</option>
//                                     <option value="Inactive">Inactive</option>
//                                     <option value="Pending">Pending</option>
//                                 </select>
//                             </div>

//                             {/* <div className="mb-4">
//                                 <label className="block text-gray-300 font-medium mb-2">
//                                     Photo Upload
//                                 </label>
//                                 <input
//                                     type="file"
//                                     alt="No Image Found"
//                                     value={formData.role}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
//                                     required
//                                 />
//                             </div> */}

//                             </div>

                       

//                             {/* Form Buttons */}
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                 >
//                                     Create
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AdduserButton;




import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser } from '../../FeatureRedux/adduserSlice';
import yourImage from '../Media/user.jpg'; // Import the image

function AdduserButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "Active",
        password: "",
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("New User Created:", formData);

        dispatch(addUser(formData));

        setIsModalOpen(false); // Close the modal after submission
    };

    return (
        <div>
            {/* Add User Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
                Add User
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white rounded-lg shadow-[0px_0px_10px_0px_gray] p-6 flex align-middle items-center">
                        {/* Left side: Static Image */}
                        <div className="flex-shrink-0 mr-6">
                            <img
                                src={yourImage} // Use the imported image
                                alt="Static Image"
                                className="w-72 h-auto object-cover rounded-lg" // Adjust the size as needed
                            />
                        </div>

                        {/* Right side: Form */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-4">Create New User</h2>
                            <form onSubmit={handleFormSubmit}>
                                {/* User Creation Form */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-300 font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-300 font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-300 font-medium mb-2">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-300 font-medium mb-2">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className=" border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdduserButton;

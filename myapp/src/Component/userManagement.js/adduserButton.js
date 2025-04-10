import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { addUser } from '../../FeatureRedux/adduserSlice';
import yourImage from '../Media/user.jpg';
import { Country, State, City } from "country-state-city";
import Swal from 'sweetalert2';
import { allUser } from "../../FeatureRedux/alluserSlice";

function AdduserButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        state: "",
        city: "",
        designation: "",
        Department: "",
        dob: "",
        status: "Active"
    });

    // Create refs for all input fields
    const inputRefs = {
        name: useRef(null),
        last_name: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        password: useRef(null),
        role: useRef(null),
        state: useRef(null),
        city: useRef(null),
        designation: useRef(null),
        Department: useRef(null),
        dob: useRef(null),
        status: useRef(null)
    };

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle Enter key press to move to next field
    const handleKeyDown = (e, nextField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextField && inputRefs[nextField]?.current) {
                inputRefs[nextField].current.focus();
            }
        }
    };

    // Default country: India (ISO Code: "IN")
    const countryCode = "IN";

    // Fetch states when the component mounts
    useEffect(() => {
        const indianStates = State.getStatesOfCountry(countryCode);
        setStates(indianStates);
    }, []);

    // Fetch cities whenever the state changes
    useEffect(() => {
        if (selectedState) {
            const stateCities = City.getCitiesOfState(countryCode, selectedState);
            setCities(stateCities);
            // Update both state and city in formData
            setFormData(prev => ({
                ...prev,
                state: states.find(s => s.isoCode === selectedState)?.name || "",
                city: stateCities.length > 0 ? stateCities[0].name : ""
            }));
        } else {
            setCities([]);
            setFormData(prev => ({
                ...prev,
                state: "",
                city: ""
            }));
        }
    }, [selectedState]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userData = {
            ...formData,
            city: formData.city || "",
            state: states.find(s => s.isoCode === selectedState)?.name || ""
        };

        dispatch(addUser(userData))
        .unwrap()
        .then(() => {
            dispatch(allUser()); // ✅ Call only after addUser is successful
            setIsModalOpen(false);

            setFormData({
                name: "",
                last_name: "",
                email: "",
                phone: "",
                password: "",
                role: "",
                state: "",
                city: "",
                designation: "",
                Department: "",
                dob: "",
                status: "Active"
            });
            setSelectedState("");

            Swal.fire({
                title: 'User Created!',
                text: `${formData.name} ${formData.last_name} has been added successfully.`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        })
        .catch((error) => {
            Swal.fire('Error', error, 'error');
        });
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
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 text-white rounded-lg shadow-[0px_0px_10px_0px_gray] p-6 flex align-middle items-center">
                        {/* Left side: Static Image */}
                        <div className="flex-shrink-0 mr-6">
                            <img
                                src={yourImage}
                                alt="User"
                                className="w-72 h-auto object-cover rounded-lg"
                            />
                        </div>

                        {/* Right side: Form */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-4">Create New User</h2>
                            <form onSubmit={handleFormSubmit}>
                                {/* Name Fields */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'last_name')}
                                            ref={inputRefs.name}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder="Last name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'email')}
                                            ref={inputRefs.last_name}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Contact Fields */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'phone')}
                                            ref={inputRefs.email}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Contact No.</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Contact number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                                            ref={inputRefs.phone}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password and Role */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'role')}
                                            ref={inputRefs.password}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Role</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'state')}
                                            ref={inputRefs.role}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        >
                                            <option value="" disabled>Select a role</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                {/* State and City */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">State</label>
                                        <select
                                            name="state"
                                            value={selectedState}
                                            onChange={(e) => {
                                                setSelectedState(e.target.value);
                                                handleInputChange(e);
                                            }}
                                            onKeyDown={(e) => handleKeyDown(e, 'city')}
                                            ref={inputRefs.state}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        >
                                            <option value="" disabled>Select a state</option>
                                            {states.map((state) => (
                                                <option key={state.isoCode} value={state.isoCode}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">City</label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'designation')}
                                            ref={inputRefs.city}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                            disabled={!selectedState || cities.length === 0}
                                        >
                                            {cities.length === 0 ? (
                                                <option value="">No cities available</option>
                                            ) : (
                                                <>
                                                    <option value="" disabled>Select a city</option>
                                                    {cities.map((city) => (
                                                        <option key={city.name} value={city.name}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                {/* Designation and Department */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Designation</label>
                                        <select
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'Department')}
                                            ref={inputRefs.designation}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        >
                                            <option value="" disabled>Select designation</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Department</label>
                                        <select
                                            name="Department"
                                            value={formData.Department}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'dob')}
                                            ref={inputRefs.Department}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        >
                                            <option value="" disabled>Select department</option>
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Operations">Operations</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date of Birth and Status */}
                                <div className="flex justify-between items-center gap-2">
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            onClick={(e) => e.target.showPicker()}
                                            onKeyDown={(e) => handleKeyDown(e, 'status')}
                                            ref={inputRefs.dob}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 w-[220px]">
                                        <label className="block text-gray-300 font-medium mb-2">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    // Focus on the submit button when Enter is pressed on the last field
                                                    document.querySelector('button[type="submit"]').focus();
                                                }
                                            }}
                                            ref={inputRefs.status}
                                            className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Create User
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
import React, { useEffect, useRef, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

import {
  updateUser,
  resetUpdateState,
} from "../../FeatureRedux/user/updateUser_slice";

import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa6";
import { allUser } from "../../FeatureRedux/alluserSlice";
import { getShift } from "../../FeatureRedux/ShiftingSlice/getShiftSlice";

const EditUserModal = ({ formData }) => {
  const dispatch = useDispatch();
  const countryCode = "IN";
  const [selectedState, setSelectedState] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { loading, error, success } = useSelector((state) => state.user);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localFormData, setLocalFormData] = useState({ ...formData });
  const [showAlert, setShowAlert] = useState(false);

  const { isUpdating, updateSuccess, updateError } = useSelector(
    (state) => state.user
  );

  const { users, isLoading, isError, errorMessage } = useSelector(
    (state) => state.allUser
  );


  useEffect(() => {
    if (isOpen && formData) {
      setLocalFormData({ ...formData });
    }

    if (formData.image) {
      setSelectedImage(formData.image);
    }

    const matchedState = State.getStatesOfCountry(countryCode).find(
      (s) => s.name === formData.state
    );

    if (matchedState) {
      setSelectedState(matchedState.isoCode);
    }
  }, [isOpen, formData]);

  useEffect(() => {
    if (isOpen) {
      const stateList = State.getStatesOfCountry(countryCode);
      setStates(stateList);
    }
  }, [isOpen]);

    useEffect(() => {
      dispatch(getShift());
    }, [dispatch]);
  
    const { getData } = useSelector((state) => state.getShift || {});
    const shiftOptions = getData?.shifts?.map((shift) => ({
      id: shift._id,
      in: shift.punchIn,
      out: shift.punchOut,
      name: shift.name,
    }));

  useEffect(() => {
    if (localFormData.state && isOpen) {
      const matchedState = State.getStatesOfCountry(countryCode).find(
        (s) => s.name === localFormData.state
      );
      if (matchedState) {
        setSelectedState(matchedState.isoCode);
      }
    }
  }, [isOpen]);

  const toggleModal = () => {
    if (isOpen) {
      setLocalFormData({ ...formData });
      setSelectedImage(formData?.image || null);
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };


  



  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (file.size <= 100 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setLocalFormData((prev) => ({ ...prev, imageFile: file }));
      return;
    }

   
    setIsCompressing(true);
    setCompressionProgress(0);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setCompressionProgress(Math.min(progress, 95));
    }, 200);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressImage = (quality) => {
          return new Promise((resolve) => {
            canvas.toBlob(
              (blob) => {
                if (blob.size <= 100 * 1024 || quality < 0.1) {
                  resolve(blob);
                } else {
                  resolve(compressImage(quality - 0.1));
                }
              },
              "image/jpeg",
              quality
            );
          });
        };

        compressImage(0.8).then((compressedBlob) => {
          clearInterval(progressInterval);
          setCompressionProgress(100);
          setTimeout(() => {
            setIsCompressing(false);
            setCompressionProgress(0);
          }, 1000);

          const resizedUrl = URL.createObjectURL(compressedBlob);
          setSelectedImage(resizedUrl);

          const resizedFile = new File([compressedBlob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          setLocalFormData((prev) => ({
            ...prev,
            imageFile: resizedFile,
          }));
        });
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState(countryCode, selectedState);
      setCities(stateCities);
      setLocalFormData((prev) => ({
        ...prev,
        state: states.find((s) => s.isoCode === selectedState)?.name || "",
        city: stateCities.length > 0 ? stateCities[0].name : "",
      }));
    } else {
      setCities([]);
      setLocalFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
  }, [selectedState]);

  const handleSave = () => {
    // Dispatch the updateUser action
    setIsUploading(true);

    const formDataToSend = new FormData();
    for (const key in localFormData) {
      if (localFormData[key] !== undefined && localFormData[key] !== null) {
        if (key === "imageFile") {
          formDataToSend.append("profile_image", localFormData[key]);
        } else {
          formDataToSend.append(key, localFormData[key]);
        }
      }
    }

    dispatch(
      updateUser({ userId: localFormData._id, updatedData: formDataToSend })
    )
      .unwrap()
      .then(() => {
        setIsUploading(false);
        setIsOpen(false);
        //dispatch(allUser());

        // Display success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "User Updated Successfully!",
          text: `successfully updated.`,
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message || "Failed to update user", "error");
      });
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-y-auto">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-visible relative pt-20">
            {isUploading && (
              <div className="absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <HashLoader color="#36d7b7" size={60} />
                  <p className="text-white text-lg">
                    Uploading image, please wait...
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Edit User</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            {error && (
              <p className="text-red-500 mb-4 p-2 bg-red-900/30 rounded">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 mb-4 p-2 bg-green-900/30 rounded">
                {success}
              </p>
            )}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative group w-32 h-32">
                {/* Show image if available, otherwise show initials */}
                {selectedImage || localFormData.profile_image ? (
                  <div
                    className="w-32 h-32 cursor-pointer relative"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img
                      src={selectedImage || localFormData.profile_image}
                      alt="User"
                      className="w-full h-full object-cover rounded-full border-4 border-gray-600 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
                    />
                    {/* Camera icon overlay */}
                    <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-2">
                      <FaCamera className="text-white text-sm" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-32 h-32 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white text-3xl font-bold rounded-full border-4 border-gray-600 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg relative"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {getInitials(localFormData.name, localFormData.last_name)}
                    {/* Camera icon overlay */}
                    <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-2">
                      <FaCamera className="text-white text-sm" />
                    </div>
                  </div>
                )}

                {/* Overlay when hovering */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>

              {/* File input hidden */}
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={localFormData.name || ""}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={localFormData.last_name || " "}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={localFormData.email || ""}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={localFormData.phone || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={
                      localFormData.dob ? localFormData.dob.slice(0, 10) : ""
                    }
                    name="dob"
                    onChange={handleInputChange}
                    onClick={(e) => e.target.showPicker()}
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    required
                  />
                </div>

                   <div className="">
                    <label className="block text-gray-300 font-medium mb-1">
                      {" "}
                      Shift
                    </label>
                    <select
                      name="shiftId"
                      value={formData.shiftId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      {shiftOptions.map((shift) => (
                        <option key={shift.id} value={shift.id}>
                          {shift.name} -- {shift.in} - {shift.out}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Department */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Department
                  </label>
                  <select
                    name="Department"
                    value={localFormData.Department}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  >
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                {/* State & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        handleInputChange(e);
                      }}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      City
                    </label>
                    <select
                      name="city"
                      value={localFormData.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                      required
                      disabled={!selectedState || cities.length === 0}
                    >
                      {cities.length === 0 ? (
                        <option value="">No cities available</option>
                      ) : (
                        <>
                          <option value="" disabled>
                            Select City
                          </option>
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

                {/* Role */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={localFormData.role || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={localFormData.password || ""}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={localFormData.status || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-700">
              <button
                onClick={toggleModal}
                disabled={loading}
                className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-5 py-2 rounded transition-colors ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserModal;

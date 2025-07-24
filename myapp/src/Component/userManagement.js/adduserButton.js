import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../FeatureRedux/adduserSlice";
import yourImage from "../Media/user.jpg";
import { Country, State, City } from "country-state-city";
import Swal from "sweetalert2";
import { allUser } from "../../FeatureRedux/alluserSlice";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import MoonLoader from "react-spinners/MoonLoader";

import { getCompany } from "../../FeatureRedux/companySlice/getCompanyslice";
import { getShift } from "../../FeatureRedux/ShiftingSlice/getShiftSlice";

function AdduserButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
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
    date_of_joining: "",
    Department: "",
    Company: "",
    shiftId: "",
    dob: "",
    salary:"",
    status: "Active",
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
    status: useRef(null),
  };

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getShift());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const { getData,isLoading,isError,errorMessage } = useSelector((state) => state.getShift || {});
  const shiftOptions = getData?.shifts?.map((shift) => ({
    id: shift._id,
    in: shift.punchIn,
    out: shift.punchOut,
    name: shift.name,
  }));

  console.log("shhift:", shiftOptions);
 


  const data1 = useSelector((state) => state.getCompany) || {};
  // console.log(`COmpany wala data ${JSON.stringify(data1)}}`);

  // Handle Enter key press to move to next field
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
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

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (file.size <= 100 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      fileInputRef.current.files = e.target.files;
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(0);

    // Fake progress update every 100ms
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setCompressionProgress(Math.min(progress, 95));
    }, 2000);

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
            setIsCompressing(false); // ✅ Hide progress after 1 sec
            setCompressionProgress(0); // ✅ Optional reset
          }, 2000);

          const resizedUrl = URL.createObjectURL(compressedBlob);
          setSelectedImage(resizedUrl);

          const resizedFile = new File([compressedBlob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(resizedFile);
          fileInputRef.current.files = dataTransfer.files;
        });
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Fetch cities whenever the state changes
  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState(countryCode, selectedState);
      setCities(stateCities);
      // Update both state and city in formData
      setFormData((prev) => ({
        ...prev,
        state: states.find((s) => s.isoCode === selectedState)?.name || "",
        city: stateCities.length > 0 ? stateCities[0].name : "",
      }));
    } else {
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
  }, [selectedState]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsUploading(true); // 🔁 Start loader

    const userData = {
      ...formData,
      city: formData.city || "",
      state: states.find((s) => s.isoCode === selectedState)?.name || "",
    };

    const formPayload = new FormData();

    if (fileInputRef.current.files[0]) {
      formPayload.append("profile_image", fileInputRef.current.files[0]);
    }

    for (const key in userData) {
      formPayload.append(key, userData[key]);
    }

    dispatch(addUser(formPayload))
      .unwrap()
      .then(() => {
        dispatch(allUser());
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
          date_of_joining: "",
          Department: "",
          Company: "",
          dob: "",
          salary:"",
          status: "Active",
        });
        setSelectedImage(null);
        setSelectedState("");

        Swal.fire({
          title: "User Created!",
          text: `${formData.name} ${formData.last_name} has been added successfully.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message || error, "error");
      })
      .finally(() => {
        setIsUploading(false);
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
            <div className="flex-shrink-0 mr-6 cursor-pointer">
              <div className="relative">
                <img
                  src={selectedImage || yourImage}
                  onClick={handleImageClick}
                  alt="User"
                  className="w-60 h-auto object-cover rounded-lg"
                />

                {/* 🌀 Uploading spinner */}
                {isUploading && !isCompressing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-0">
                    <MoonLoader color="#36d7b7" size={50} />
                  </div>
                )}

                {/* 🟦 Compression progress bar */}
                {isCompressing && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-700 bg-opacity-90 text-xs text-center py-1 rounded-b-lg z-10">
                    <div className="w-full h-2 bg-gray-600">
                      <div
                        className="h-2 bg-blue-400 transition-all duration-200"
                        style={{ width: `${compressionProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-white mt-1 block">
                      {compressionProgress}% Compressing...
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                />
              </div>
            </div>

            {/* Right side: Form */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Create New User</h2>
              <form onSubmit={handleFormSubmit}>
                {/* Name Fields */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "last_name")}
                      ref={inputRefs.name}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "email")}
                      ref={inputRefs.last_name}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "phone")}
                      ref={inputRefs.email}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Contact No.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Contact number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "password")}
                      ref={inputRefs.phone}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Password and Role */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "role")}
                      ref={inputRefs.password}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "state")}
                      ref={inputRefs.role}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>

                {/* State and City */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
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
                      onKeyDown={(e) => handleKeyDown(e, "city")}
                      ref={inputRefs.state}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "designation")}
                      ref={inputRefs.city}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                      disabled={!selectedState || cities.length === 0}
                    >
                      {cities.length === 0 ? (
                        <option value="">No cities available</option>
                      ) : (
                        <>
                          <option value="" disabled>
                            Select a city
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

                {/* Designation and Department */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Designation
                    </label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "Department")}
                      ref={inputRefs.designation}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select designation
                      </option>
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Department
                    </label>
                    <select
                      name="Department"
                      value={formData.Department}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "dob")}
                      ref={inputRefs.Department}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select department
                      </option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Company
                    </label>
                    <select
                      name="Company"
                      value={formData.Company}
                      onChange={handleInputChange}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    >
                      <option value="" disabled>
                        Select Company
                      </option>
                      {data1.data1 &&
                        Array.isArray(data1.data1) &&
                        data1.data1.map((data) => (
                          <option key={data._id} value={data._id}>
                            {data.company_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      name="date_of_joining"
                      value={formData.date_of_joining}
                      onChange={handleInputChange}
                      onClick={(e) => e.target.showPicker()}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Date of Birth and Status */}
                <div className="flex justify-between items-center gap-2">
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      onClick={(e) => e.target.showPicker()}
                      onKeyDown={(e) => handleKeyDown(e, "status")}
                      ref={inputRefs.dob}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          // Focus on the submit button when Enter is pressed on the last field
                          document
                            .querySelector('button[type="submit"]')
                            .focus();
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
                <div className="flex flex-row gap-2">
                  <div className="mb-2 w-[220px]">
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

                 <div className="mb-2 w-[220px]">
                    <label className="block text-gray-300 font-medium mb-1">
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      placeholder="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e, "role")}
                      ref={inputRefs.password}
                      className="w-full border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-800 text-white"
                      required
                    />
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

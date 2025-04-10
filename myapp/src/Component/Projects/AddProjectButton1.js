import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "aos/dist/aos.css";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";

import { Country, State, City } from "country-state-city";
import { AddProject } from "../../FeatureRedux/projectCreation";
import { ToWords } from "to-words";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { projectlist } from "../../FeatureRedux/projectlistSlice";

function AddProjectButton1() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    team_members: "",
    sector: "", // ✅ Added status field
    budget: "",
    country: "", // Default to India
    state: "",
    city: "",
    Area: "",
    areaUnit: "KM",
  });

  const toWords = new ToWords();

  useEffect(() => {
    const fetchCountries = Country.getAllCountries();
    setCountries(fetchCountries);

    // Set India as the default country and fetch its states
    const indiaStates = State.getStatesOfCountry("IN");
    setStates(indiaStates);

    // Update formData with the default country
    setFormData((prev) => ({
      ...prev,
      country: "India",
    }));
  }, []);

  const nameRef = useRef(null);
  const managerRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const sectorRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const areaRef = useRef(null);
  const budgetRef = useRef(null);

  const { isLoading, isError, errorMessage, isAdded } = useSelector(
    (state) => state.AddProject
  );
  const userlist = useSelector((state) => state.allUser.users);

  const editor = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(allUser());
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    return () => Aos.refresh();
  }, [dispatch]);

  // Handle form field changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    console.log("Current team_members value:", formData.team_members);
    console.log(
      "Selected option:",
      userlist?.find((user) => user.id === formData.team_members)
    );
  }, [formData.team_members, userlist]);

  const [showInput, setShowInput] = useState(false);

  const handlekeydown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special case for sector to toggle input
    if (name === "sector" && value === "add_new") {
      setShowInput(true);
      setFormData((prev) => ({ ...prev, sector: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, sector: e.target.value });
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #93C5FD", // Matches border-blue-300
      minHeight: "10px",
      Height: "10px", // Reduce height to match standard select
      borderRadius: "2px", // Same as rounded-sm
      padding: "0px",
      boxShadow: "none",
      backgroundColor: "white", // Ensure background is white
      "&:hover": {
        border: "1px solid #93C5FD",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6B7280",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white", // Ensure dropdown background is white
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "white" : "white", // Remove blue highlight on selection
      color: "#000", // Ensure text remains black
      "&:hover": {
        backgroundColor: "#E5E7EB", // Light gray hover effect (optional)
      },
    }),
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    const countryObj = countries.find((c) => c.isoCode === countryCode);

    // Fetch states for the selected country
    const fetchedStates = State.getStatesOfCountry(countryCode);
    setStates(fetchedStates);

    // Reset state and city
    setSelectedState("");
    setSelectedCity("");
    setCities([]);

    // Update formData
    setFormData((prev) => ({
      ...prev,
      country: countryObj ? countryObj.name : "",
      state: "", // Reset state to empty string
      city: "", // Reset city to empty string
    }));
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value; // Get the selected state code
    setSelectedState(stateCode); // Update the selected state
    setSelectedCity(""); // Reset the selected city

    // Fetch cities for the selected state
    const fetchedCities =
      City.getCitiesOfState(selectedCountry, stateCode) || [];
    setCities(fetchedCities); // Ensure it's always an array

    // Find the state name, or pass an empty string if not found
    const stateName = states.find((s) => s.isoCode === stateCode)?.name || "";

    // Update formData
    setFormData((prev) => ({
      ...prev,
      state: stateName, // Store the state name
      city: "", // Reset city when state changes
    }));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);

    // Update formData
    setFormData((prev) => ({
      ...prev,
      city: cityName || "", // Pass empty if no city is selected
    }));
  };

  // Handle description change
  const handleDescriptionChange = (newContent) => {
    setDescription(newContent);
    setFormData((prev) => ({
      ...prev,
      description: newContent,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    console.log("Form submitted!");

    // if (!formData.name || !formData.start_date) {
    //   alert("Project Name and Start Date are required.");
    //   return;
    // }
    const submissionData = {
      ...formData,
      state: formData.state || "", // Pass empty string if state is not available
      city: formData.city || "", // Pass empty string if city is not available+++++++++++++++++++++++++++++++++++++
    };

    try {
      dispatch(AddProject(submissionData)).then(() => {
        dispatch(projectlist());
      });

      Swal.fire({
        title: "Project Created Successfully",
        text: "Added",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {});
    } catch (error) {
      Swal.fire("Error in Adding Project");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headings
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ align: [] }], // Alignment options (left, center, right, justify)
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      ["blockquote", "code-block"], // Block types
      [{ color: [] }, { background: [] }], // Text color & background

      ["clean"], // Remove formatting
    ],
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        team_members: [],
        sector: "",
        budget: "",
        country: "india", // Reset to India
        state: "",
        city: "",
        Area: "",
      });
    }
  };

  // Close modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Convert userlist from backend into react-select format
  const teamOptions = userlist?.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Add Project Button */}
      <button onClick={toggleModal} className="flex justify-start">
        <a
          href="#_"
          className="relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-indigo-50 border-2 border-indigo-50 rounded hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-700 ease"></span>
          <span className="relative">Add Project</span>
        </a>
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {successMessage}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end bg-gray-900 bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white shadow-none w-[50%] flex flex-col h-full overflow-hidden"
            data-aos="fade-up-left"
          >
            {/* Modal Header */}
            <div className="flex p-2 justify-between text-center items-center border-b pb-2 bg-slate-50 shadow-none">
              <h2 className="text-xl font-semibold px-3">New Project</h2>
              <button
                onClick={toggleModal}
                className="text-gray-600 text-xl transform hover:text-gray-800 hover:rotate-180 transition-transform duration-300"
              >
                ✖
              </button>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 p-6 overflow-y-auto flex-grow">
              {/* Project Name */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">
                  Project Name
                </label>
                <input
                  require
                  type="text"
                  name="name"
                  onKeyDown={(e) => handlekeydown(e, managerRef)}
                  ref={nameRef}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm"
                />
              </div>

              {/* Team Members */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">
                  Project Manager
                </label>
                <select
                  name="team_members"
                  value={formData.team_members}
                  onChange={handleChange}
                  onKeyDown={(e) => handlekeydown(e, startDateRef)}
                  ref={managerRef}
                  required
                  className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm"
                >
                  <option value="" disabled>
                    Select a team member
                  </option>
                  {userlist &&
                    userlist.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Dates */}
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    ref={startDateRef}
                    onKeyDown={(e) => handlekeydown(e, endDateRef)}
                    onClick={(e) => e.target.showPicker()}
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                    className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    ref={endDateRef}
                    onKeyDown={(e) => handlekeydown(e, sectorRef)}
                    onClick={(e) => e.target.showPicker()}
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                    className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm"
                  />
                </div>
              </div>

              {/* Project Status */}
              {/* <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Sector</label>
                <select name="sector" value={formData.sector} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Add New Sector</option>
                  <option value="Active">Highways</option>
                  <option value="Completed">Railways</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Factory">Factory</option>
                </select>
              </div> */}

              {/* Sector */}
              <div className="flex flex-col w-full">
                {/* Label + +Button in same row */}
                <div className="flex justify-between items-center w-full mb-1">
                  <label className="font-semibold text-gray-700">Sector</label>
                  {!showInput && (
                    <button
                      type="button"
                      onClick={() => setShowInput(true)}
                      className="text-black rounded-full px-2 py-0 hover:bg-blue-600 hover:text-white"
                    >
                      Add New Sector +
                    </button>
                  )}
                </div>

                {/* Input row below */}
                <div className="flex items-center w-full">
                  {!showInput ? (
                    <select
                      name="sector"
                      value={formData.sector}
                      ref={sectorRef}
                      onKeyDown={(e) => handlekeydown(e, descriptionRef)}
                      onChange={handleChange}
                      className="w-full border border-blue-300 px-2 py-1 rounded-sm"
                    >
                      <option value="" disabled>
                        Select Sector
                      </option>
                      <option value="Highways">Highways</option>
                      <option value="Railways">Railways</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Factory">Factory</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      placeholder="Type new sector"
                      className="w-full border border-blue-300 px-2 py-1 rounded-sm"
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              {/* <div onClick={(e)=>e.stopPropagation()} className="w-full ">
                <label className="font-semibold text-gray-700">Description</label>
                <JoditEditor ref={editor} value={description} onChange={handleDescriptionChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div> */}

              <div className="w-full">
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  ref={descriptionRef}
                  onKeyDown={(e) => handlekeydown(e, countryRef)}
                  value={description} // Use description from state
                  onChange={handleDescriptionChange} // Ensure proper update
                  className="w-full border border-blue-300 rounded-sm"
                  modules={modules}
                />
              </div>

              <div className="flex flex-row gap-2">
                {/* Country Dropdown */}
                <div className="w-full mt-4">
                  <label className="font-semibold text-gray-700">Country</label>
                  <select
                    onChange={handleCountryChange}
                    ref={countryRef}
                    onKeyDown={(e) => handlekeydown(e, stateRef)}
                    value={selectedCountry}
                    className="w-full border border-blue-300 px-2 py-1 rounded-sm"
                    required // Add required attribute
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown */}
                <div className="w-full mt-4">
                  <label className="font-semibold text-gray-700">State</label>
                  <select
                    onChange={handleStateChange}
                    ref={stateRef}
                    onKeyDown={(e) => handlekeydown(e, cityRef)}
                    value={selectedState}
                    className="w-full border border-blue-300 px-2 py-1 rounded-sm"
                    required // Add required attribute
                  >
                    <option value="" disabled>
                      Select a state
                    </option>
                    {states.length > 0 ? (
                      states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No states available
                      </option>
                    )}
                  </select>
                </div>

                {/* City Dropdown */}
                <div className="w-full mt-4">
                  <label className="font-semibold text-gray-700">City</label>
                  <select
                    ref={cityRef}
                    onChange={handleCityChange}
                    onKeyDown={(e) => handlekeydown(e, areaRef)}
                    value={selectedCity}
                    className="w-full border border-blue-300 px-2 py-1 rounded-sm"
                    required // Add required attribute
                  >
                    <option value="" disabled>
                      Select a city
                    </option>
                    {cities.length > 0 ? (
                      cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No cities available
                      </option>
                    )}
                  </select>
                </div>
              </div>

              {/* <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Area</label>
                <input type="number" min='0' placeholder="Area in KM" name="Area" value={formData.Area} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div> */}

              <div className="flex flex-col items-start w-full">
                <label className="font-semibold text-gray-700">Area</label>
                <div className="flex w-full">
                  {/* Area Input */}
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter Area"
                    name="Area"
                    required
                    ref={areaRef}
                    onKeyDown={(e) => handlekeydown(e, budgetRef)}
                    value={formData.Area}
                    onChange={handleChange}
                    className="w-1/4 border border-blue-300 px-2 py-1 rounded-l-sm"
                  />

                  {/* Unit Selection */}
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="w-1/4 border border-blue-300 px-2 py-1 rounded-r-sm bg-white"
                  >
                    <option value="KM">KM</option>
                    <option value="Meter">Meter</option>
                    <option value="Acre">Acres</option>
                    <option value="Hectare">Hectares</option>
                    <option value="SquareKm">Sq. KM</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="flex w-1/4 flex-col items-start">
                <label className="font-semibold text-gray-700">Budget</label>
                <input
                  type="number"
                  min="0"
                  name="budget"
                  ref={budgetRef}
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm"
                />
                {formData.budget && (
                  <p className="text-gray-600 text-sm">
                    {toWords.convert(parseInt(formData.budget))} Rupee Only
                  </p>
                )}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="w-full p-2 flex justify-start space-x-2 shadow-md shadow-gray-500 bg-white">
              <button
                onClick={toggleModal}
                className="text-gray-500 px-4 rounded-lg hover:rounded-lg py-2 hover:bg-red-700 hover:text-white transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectButton1;

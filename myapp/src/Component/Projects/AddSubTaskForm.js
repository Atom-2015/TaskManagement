import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "aos/dist/aos.css";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";

import { Country, State, City } from "country-state-city";
import { AddProject } from "../../FeatureRedux/projectCreation"; // Import AddProject action
import ReactQuill from "react-quill";
import { subcreatetasks } from "../../FeatureRedux/subTaskSlices/addsubTaskslice";
import Swal from "sweetalert2";
import { getsubtasklist } from "../../FeatureRedux/subTaskSlices/getsubtaskslice";





function AddSubTaskForm({ open, close , taskId }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    team_members: [],
    status: "",  // ✅ Added status field
    budget: "",
    country: "", // Default to India
    state: "",
    city: "",
    Area: ""
  });
  

  // console.log("thisis sub task :" , taskid)
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

  const { isLoading, isError, errorMessage, isAdded } = useSelector((state) => state.AddProject);
  const userlist = useSelector((state) => state.allUser.users);

  const editor = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(allUser())
    // .then(()=>{
    //     dispatch(getsubtasklist({ taskId }));
    //     Aos.refresh();
    // })
    // .catch((error) => {
    //   console.error("Error loading users:", error);
    // });
    
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

   
  }, [dispatch]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const fetchedCities = City.getCitiesOfState(selectedCountry, stateCode) || [];
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
  const handlaAddTaskSubmit = async (e) => {
    e.preventDefault();
  
    const submissionData = {
      name: formData.name,
      assigned_userid: formData.team_members,
      priority: formData.priority,
      start_date: formData.start_date,
      end_date: formData.end_date,
      cost: formData.budget,
      status: formData.status,
      task_id: taskId,
    };
  
    const response = await dispatch(subcreatetasks({ submissionData }));
  
    if (response?.meta?.requestStatus === "fulfilled") {
      Swal.fire({
        icon: "success",
        title: "Subtask Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });

      dispatch(getsubtasklist({ taskId }));

      setTimeout(() => {
        setSuccessMessage("");
        toggleModal(); 
      }, 1500);
    } else {
      console.error("Failed to submit subtask:", response?.error);
    }
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
        status: "",
        budget: "",
        country: "india", // Reset to India
        state: "",
        city: "",
        Area: ""
      });
    }
  };

  // Close modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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
        <a href="#_" className="relative inline-flex items-center px-12 py-1 overflow-hidden text-lg font-medium text-indigo-900 border-2 border-indigo-50 rounded hover:text-white group hover:bg-gray-50">
          <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-700 ease"></span>
          <span className="relative">Add Sub Task</span>
        </a>
      </button>

      {/* Success Message */}
      {/* {successMessage && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {successMessage}
        </div>
      )} */}


      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end bg-gray-900 bg-opacity-50">
          <div ref={modalRef} className="bg-white shadow-none w-[50%] flex flex-col h-full overflow-hidden" data-aos="fade-left">

            {/* Modal Header */}
            <div className="flex p-2 justify-between text-center items-center border-b pb-2 bg-slate-50 shadow-none">
              <h2 className="text-xl font-semibold px-3">Add Task</h2>
              <button onClick={toggleModal} className="text-gray-600 text-xl transform hover:text-gray-800 hover:rotate-180 transition-transform duration-300">✖</button>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 p-6 overflow-y-auto flex-grow">

              {/* Project Name */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Task Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>

              {/* Team Members */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">User Assign</label>
                <select name="team_members" value={formData.team_members} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Select a team member</option>
                  {userlist && userlist.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}
                </select>
              </div>


              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>


              {/* Dates */}
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">Start Date</label>
                  <input type="date" name="start_date" onClick={(e) => e.target.showPicker()} value={formData.start_date} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">End Date</label>
                  <input type="date" name="end_date" onClick={(e) => e.target.showPicker()} value={formData.end_date} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
                </div>
              </div>

              {/* Project Status */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Task Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              {/* Description */}
              <div className="w-full">
                <label className="font-semibold text-gray-700">Description</label>
                <ReactQuill
                  theme="snow"
                  value={description} // Use description from state
                  onChange={handleDescriptionChange} // Ensure proper update
                  className="w-full border border-blue-300 rounded-sm"
                  modules={modules}
                />
              </div>



              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Area</label>
                <input type="number" min='0' placeholder="Area in KM" name="Area" value={formData.Area} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>

              {/* Budget */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Budget</label>
                <input type="number" min='0' name="budget" value={formData.budget} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>



            </form>

            {/* Modal Footer */}
            <div className="w-full p-2 flex justify-start space-x-2 shadow-md shadow-gray-500 bg-white">
              <button onClick={close} className="text-gray-500 px-4 rounded-lg hover:rounded-lg py-2 hover:bg-red-700 hover:text-white transition duration-300">Cancel</button>
              <button onClick={(e) => handlaAddTaskSubmit(e)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSubTaskForm;
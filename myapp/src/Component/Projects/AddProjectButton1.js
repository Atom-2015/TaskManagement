import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "aos/dist/aos.css";
import Aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";
import { AddProject } from "../../FeatureRedux/projectCreation"; // Import AddProject action

function AddProjectButton1() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [description, setDescription] = useState(""); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    team_members: [],
    status: "",  // ✅ Added status field
    budget: "",
  });

  const { isLoading, isError, errorMessage, isAdded } = useSelector((state) => state.AddProject);
  const userlist = useSelector((state) => state.allUser.users);
  
  const editor = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(allUser());
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    return () => Aos.refresh();
  }, [dispatch]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
  
    if (!formData.name || !formData.start_date) {
      alert("Project Name and Start Date are required.");
      return;
    }
    dispatch(AddProject(formData));

    setSuccessMessage("Project Submitted Successfully")
    setTimeout(()=>{
      setSuccessMessage("");
      toggleModal("");

  },1000)
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
        <a href="#_" className="relative inline-flex items-center px-12 py-2 overflow-hidden text-lg font-medium text-indigo-50 border-2 border-indigo-50 rounded hover:text-white group hover:bg-gray-50">
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
          <div ref={modalRef} className="bg-white shadow-none w-[50%] flex flex-col h-full overflow-hidden" data-aos="fade-up-left">
            
            {/* Modal Header */}
            <div className="flex p-2 justify-between text-center items-center border-b pb-2 bg-slate-50 shadow-none">
              <h2 className="text-xl font-semibold px-3">New Project</h2>
              <button onClick={toggleModal} className="text-gray-600 text-xl hover:text-gray-800">✖</button>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4 p-6 overflow-y-auto flex-grow">
              
              {/* Project Name */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Project Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>

              {/* Team Members */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Team Members</label>
                <select name="team_members" value={formData.team_members} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Select a team member</option>
                  {userlist && userlist.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
              </div>

              {/* Dates */}
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">Start Date</label>
                  <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="font-semibold text-gray-700">End Date</label>
                  <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
                </div>
              </div>

              {/* Project Status */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Project Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm">
                  <option value="" disabled>Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              {/* Description */}
              <div className="w-full">
                <label className="font-semibold text-gray-700">Description</label>
                <JoditEditor ref={editor} value={description} onChange={handleDescriptionChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>

              {/* Budget */}
              <div className="flex flex-col items-start">
                <label className="font-semibold text-gray-700">Budget</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="w-full border border-blue-300 px-1 py-[0.5px] rounded-sm" />
              </div>
            </form>

            {/* Modal Footer */}
            <div className="w-full p-2 flex justify-start space-x-2 shadow-md shadow-gray-500 bg-white">
              <button onClick={toggleModal} className="text-gray-500 px-4 py-2">Cancel</button>
              <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" disabled={isLoading}>
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

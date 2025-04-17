import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Country, State, City } from "country-state-city";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { addCompany } from "../../FeatureRedux/companySlice/addCompanyslice";

const CompanyAddForm = ({
  onClose,
  onAddCompany,
  editingCompany,
  buttonRef,
}) => {
  const defaultCountry = "India";
  const formRef = useRef(null);
  const overlayRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [formData, setFormData] = useState({
    company_name: editingCompany?.company_name || "",
    client_name: editingCompany?.client_name || "",
    email: editingCompany?.email || "",
    joinDate: editingCompany?.joinDate || "",
    validity: editingCompany?.validity || "",
    cost: editingCompany?.cost || "",
    country: editingCompany?.country || defaultCountry,
    state: editingCompany?.state || "",
    city: editingCompany?.city || "",
  });

  const dispatch = useDispatch();

  const { data, isLoading, isError, errorMessage } = useSelector(
    (state) => state.addcompanyform
  );

  // Handle window resize
  // In CompanyAddForm component, update the click outside handler:

  // Handle click outside - Precise version
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!formRef.current) return;

      // Get form container dimensions (the actual visible form)
      const formContainer = formRef.current.querySelector(".bg-gray-700"); // The form's container div
      if (!formContainer) return;

      const formRect = formContainer.getBoundingClientRect();

      // Check if click is outside form boundaries
      if (
        event.clientX < formRect.left ||
        event.clientX > formRect.right ||
        event.clientY < formRect.top ||
        event.clientY > formRect.bottom
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Prevent scrolling when modal is open
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, []);

  // Handle click outside - Precise version
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!formRef.current) return;

      // Get form dimensions
      const formRect = formRef.current.getBoundingClientRect();

      // Check if click is outside form boundaries
      if (
        event.clientX < formRect.left ||
        event.clientX > formRect.right ||
        event.clientY < formRect.top ||
        event.clientY > formRect.bottom
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({
      ...formData,
      country,
      state: "", // Reset state when country changes
      city: "", // Reset city when country changes
    });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData({
      ...formData,
      state,
      city: "", // Reset city when state changes
    });
  };

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      city: e.target.value,
    });
  };

  // Get available states and cities based on selections
  const availableStates = State.getStatesOfCountry(
    Country.getAllCountries().find(c => c.name === formData.country)?.isoCode
  ) || [];

  const availableCities = City.getCitiesOfState(
    Country.getAllCountries().find(c => c.name === formData.country)?.isoCode,
    availableStates.find(s => s.name === formData.state)?.isoCode
  ) || [];

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...formData.location];
    updatedLocations[index][field] = value;
    setFormData({ ...formData, location: updatedLocations });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      

      const resultAction = await dispatch(addCompany(formData));

      if (addCompany.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Company Created Successfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          onAddCompany(formData)
          onClose();
        });
      } else {
        throw new Error(resultAction.payload || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add company",
        icon: "error",
      });
    }
  };

  // Calculate button position for animation origin
  const getButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  const buttonPosition = getButtonPosition();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.4}
          style={{ position: "fixed" }}
        />
      )}

      {/* Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[110]"
          >
            {editingCompany
              ? "Company updated successfully!"
              : "Company added successfully!"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <motion.div
        ref={formRef}
        initial={{
          scale: 0.1,
          opacity: 0,
          x: buttonPosition.x,
          y: buttonPosition.y,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
        }}
        exit={{
          scale: 0.1,
          opacity: 0,
          x: buttonPosition.x,
          y: buttonPosition.y,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 150, mass: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-[105] transform-gpu will-change-transform"
      >
        <div className="bg-gray-200 rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 relative max-h-[80vh] overflow-hidden">
          <button
            className="absolute top-3 right-3 bg-gray-600 w-8 h-8 border border-gray-500 shadow-md flex items-center justify-center rounded-full hover:bg-gray-500 transition-colors z-10"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={18} className="text-white" />
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingCompany ? "Edit Company" : "Add New Company"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="company_password"
                  value={formData.company_password}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  COI Date
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onClick={(e) => e.target.showPicker()}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Validity Date
                </label>
                <input
                  type="date"
                  name="validity"
                  value={formData.validity}
                  onClick={(e) => e.target.showPicker()}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={formData.country}
            onChange={handleCountryChange}
            className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700"
          >
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            value={formData.state}
            onChange={handleStateChange}
            disabled={!formData.country}
            className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700 disabled:opacity-50"
          >
            <option value="">Select State</option>
            {availableStates.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={formData.city}
            onChange={handleCityChange}
            disabled={!formData.state}
            className="w-full bg-gray-100 border border-gray-500 rounded-md p-2 text-gray-700 disabled:opacity-50"
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingCompany ? "Update" : "Add"} Company
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyAddForm;

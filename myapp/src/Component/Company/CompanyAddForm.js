import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Country, State, City } from "country-state-city";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

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
    Owner: editingCompany?.Owner || "",
    company_email: editingCompany?.company_email || "",
    company_joinDate: editingCompany?.company_joinDate || "",
    company_validity:editingCompany?.company_validity ||"",
    permission_location: editingCompany?.permission_location || [
      {
        country: defaultCountry,
        state: "",
        cities: [],
      },
    ],
  });

  // Handle window resize
// In CompanyAddForm component, update the click outside handler:

// Handle click outside - Precise version
useEffect(() => {
    const handleClickOutside = (event) => {
      if (!formRef.current) return;
      
      // Get form container dimensions (the actual visible form)
      const formContainer = formRef.current.querySelector('.bg-gray-700'); // The form's container div
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

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...formData.permission_location];
    updatedLocations[index][field] = value;
    setFormData({ ...formData, permission_location: updatedLocations });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCompany(formData);

    
        Swal.fire({
          title:"Task Created Successfully",
          text:"Added",
          icon:"success",
           confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
        }).then(()=>{
          onClose();
        })
      
     
    


    // setTimeout(() => {
    //   setShowConfetti(false);
    //   setShowSuccessMessage(false);
    //   onClose();
    // }, 3000);
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
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50" 
      />

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
        <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 relative max-h-[80vh] overflow-hidden">
          <button
            className="absolute top-3 right-3 bg-gray-600 w-8 h-8 border border-gray-500 shadow-md flex items-center justify-center rounded-full hover:bg-gray-500 transition-colors z-10"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={18} className="text-white" />
          </button>

          <h2 className="text-xl font-bold text-white mb-4">
            {editingCompany ? "Edit Company" : "Add New Company"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  name="Owner"
                  value={formData.Owner}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="company_password"
                  value={formData.company_password}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  COI Date
                </label>
                <input
                  type="date"
                  name="company_joinDate"
                  value={formData.company_joinDate}
                  onClick={(e)=>e.target.showPicker()}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Validity Date
                </label>
                <input
                  type="date"
                  name="company_validity"
                  value={formData.company_validity}
                  onClick={(e)=>e.target.showPicker()}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Locations
              </label>
              {formData.permission_location.map((loc, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Country
                    </label>
                    <select
                      value={loc.country}
                      onChange={(e) => {
                        const countryName = e.target.value;
                        handleLocationChange(index, "country", countryName);
                        handleLocationChange(index, "state", "");
                        handleLocationChange(index, "cities", []);
                      }}
                      className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white"
                    >
                      {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      State
                    </label>
                    <select
                      value={loc.state}
                      onChange={(e) => {
                        const stateName = e.target.value;
                        handleLocationChange(index, "state", stateName);
                        handleLocationChange(index, "cities", []);
                      }}
                      disabled={!loc.country}
                      className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white disabled:opacity-50"
                    >
                      <option value="">Select State</option>
                      {loc.country &&
                        State.getStatesOfCountry(
                          Country.getAllCountries().find(
                            (c) => c.name === loc.country
                          )?.isoCode
                        ).map((state) => (
                          <option key={state.isoCode} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      City
                    </label>
                    <select
                      value={loc.cities[0] || ""}
                      onChange={(e) => {
                        const cityName = e.target.value;
                        handleLocationChange(index, "cities", [cityName]);
                      }}
                      disabled={!loc.state}
                      className="w-full bg-gray-600 border border-gray-500 rounded-md p-2 text-white disabled:opacity-50"
                    >
                      <option value="">Select City</option>
                      {loc.state &&
                        loc.country &&
                        City.getCitiesOfState(
                          Country.getAllCountries().find(
                            (c) => c.name === loc.country
                          )?.isoCode,
                          State.getStatesOfCountry(
                            Country.getAllCountries().find(
                              (c) => c.name === loc.country
                            )?.isoCode
                          ).find((s) => s.name === loc.state)?.isoCode
                        ).map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
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
import React, { useEffect } from "react";

const UserdetailsForm = ({ userId, onClose, userDetails, companyList }) => {
  const selectedUser = userDetails.find((user) => user?._id === userId);
  console.log(selectedUser);

  const companyId = selectedUser?.Company;
  const companyName = Array.isArray(companyList)
    ? companyList.find((company) => company?._id === companyId)?.company_name
    : "Unknown Company";

  // Function to generate initials if no profile image
  const getInitials = (name, lastName) => {
    if (!name && !lastName) return "";
    return `${name?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };


   useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto"; // Enable scroll again
    };
  }, []);

  return (
      <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 backdrop-blur-lg overflow-y-auto">
      <div className="relative bg-gradient-to-r from-gray-700 via-gray-700 to-gray-800 w-[80%] max-w-lg p-6 rounded-2xl shadow-2xl text-white transition-transform transform hover:scale-100">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl transition-transform transform hover:scale-110"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-10">
          {selectedUser?.profile_image ? (
            <img
              src={selectedUser?.profile_image}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-100">
              {getInitials(selectedUser?.name, selectedUser?.last_name)}
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="mt-3 text-2xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">
          User Profile
        </h2>
        <p className="text-center text-gray-200 mb-4 text-lg font-semibold">
          {companyName}
        </p>

        {/* User Information */}
        <div className="p-3 bg-gray-800 rounded-2xl shadow-2xl border border-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Left Section */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-indigo-400 mb-3 underline underline-offset-2">
                Personal Details
              </h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Name:
                  </span>
                  <span className="text-gray-300 text-xs">
                    {selectedUser.name} {selectedUser.last_name}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Email:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.email}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Phone:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Designation:
                  </span>
                  <span className="text-gray-300 text-xs">
                    {selectedUser.designation}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-indigo-400 mb-3 underline underline-offset-2">
                Other Details
              </h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">DOB:</span>
                  <span className="text-gray-300 text-xs">
                    {new Date(selectedUser.dob).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    State:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.state}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    City:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.city}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Status:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.status}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-400 font-semibold text-xs">
                    Role:
                  </span>
                  <span className="text-gray-300 text-xs">{selectedUser.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button Bottom */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold transition-all duration-300 shadow-xl hover:scale-100 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserdetailsForm;
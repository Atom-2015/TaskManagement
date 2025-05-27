import React from "react";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="relative bg-gradient-to-r from-gray-700 via-gray-700 to-gray-800 w-[90%] max-w-2xl p-12 rounded-3xl shadow-2xl text-white transition-transform transform hover:scale-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl transition-transform transform hover:scale-110"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-10">
          {selectedUser?.profile_image ? (
            <img
              src={selectedUser?.profile_image}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-100"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-100">
              
              {getInitials(selectedUser?.name, selectedUser?.last_name)}
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-4xl font-extrabold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">
          User Profile
        </h2>
        <p className="text-center text-gray-200 mb-8 text-2xl font-semibold">
          {companyName}
        </p>

        {/* User Information */}
        <div className="p-3  bg-gray-800 rounded-3xl shadow-2xl border border-gray-900 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg ">
            {/* Left Section */}
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-indigo-400 mb-6 underline underline-offset-4">
                Personal Details
              </h4>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Name:
                  </span>
                  <span className="text-gray-300">
                    {selectedUser.name} {selectedUser.last_name}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Email:
                  </span>
                  <span className="text-gray-300">{selectedUser.email}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Phone:
                  </span>
                  <span className="text-gray-300">{selectedUser.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Designation:
                  </span>
                  <span className="text-gray-300">
                    {selectedUser.designation}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-indigo-400 mb-6 underline underline-offset-4">
                Other Details
              </h4>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">DOB:</span>
                  <span className="text-gray-300">
                    {new Date(selectedUser.dob).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    State:
                  </span>
                  <span className="text-gray-300">{selectedUser.state}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    City:
                  </span>
                  <span className="text-gray-300">{selectedUser.city}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Status:
                  </span>
                  <span className="text-gray-300">{selectedUser.status}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-400 font-semibold">
                    Role:
                  </span>
                  <span className="text-gray-300">{selectedUser.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button Bottom */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onClose}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold transition-all duration-300 shadow-xl hover:scale-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserdetailsForm;

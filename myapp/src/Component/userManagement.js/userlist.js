// import React from "react";

// function Userlist() {
//   const users = [
//     { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
//     { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", status: "Inactive" },
//     { name: "Mike Johnson", email: "mike.johnson@example.com", role: "Viewer", status: "Pending" },
//     { name: "Emily Davis", email: "emily.davis@example.com", role: "Admin", status: "Active" },
//     { name: "Sophia Brown", email: "sophia.brown@example.com", role: "Editor", status: "Inactive" },
//   ];

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-300 text-green-700";
//       case "Inactive":
//         return "bg-gray-300 text-gray-700";
//       case "Pending":
//         return "bg-yellow-300 text-yellow-700";
//       default:
//         return "bg-gray-300 text-gray-700";
//     }
//   };

//   return (
//     <div className="p-6 bg-[#2e3e4e] min-h-screen">
//       {/* <h1 className="text-2xl font-semibold text-white mb-6">User List</h1> */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//         {users.length > 0 ? (
//           users.map((user, index) => (
//             <div
//               key={index}
//               className="bg-[#354759] rounded-lg shadow-lg border-l-4 p-2 hover:shadow-xl transition-all"
//             >
//               <h2 className="text-xl font-thin text-white mb-2">{user.name}</h2>
//               <table className="w-full table-fixed text-sm">
//                 <thead>
//                   <tr className="text-white border-b">
//                     <th className="px-4 py-2 font-thin text-center">Email</th>
//                     <th className="px-4 py-2  font-thin text-center">Role</th>
//                     <th className="px-4 py-2 font-thin text-center">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="px-4 py-2 font-thin text-white">{user.email}</td>
//                     <td className="px-4 py-2 font-thin text-white">{user.role}</td>
//                     <td className="px-4 py-2">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
//                           user.status
//                         )}`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 col-span-full">No users found.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Userlist;











import React, { useState } from "react";
import noor from '../Media/noor.jpeg'

function Userlist() {
  const [viewMode, setViewMode] = useState("grid"); // Toggle between 'grid' and 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const users = [
    {
      name: "Noor Bhai",
      email: "mohd.nuruddin.atom@gmail.com",
      role: "Editor",
      status: "Active",
      image: noor
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "Inactive",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Viewer",
      status: "Pending",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Admin",
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Sophia Brown",
      email: "sophia.brown@example.com",
      role: "Editor",
      status: "Inactive",
      image: "https://via.placeholder.com/50",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Inactive":
        return "bg-gray-400 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // Filter and Search Logic
  const filteredUsers = users.filter((user) => {
    return (
      (filterStatus === "" || user.status === filterStatus) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="p-6 bg-[#2e3e4d]">
      {/* Controls */}
      <div className="flex items-center justify-end mb-6 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 rounded-md border border-gray-500 bg-[#2e3e4e] text-white focus:outline-none w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Dropdown */}
        <select
          className="px-4 py-2 rounded-md border border-gray-500 bg-[#2e3e4e] text-white focus:outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Toggle Button for Grid/List View */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105"
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
        >
          {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      {/* User List */}
      {viewMode === "list" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#2e3e4e] text-white rounded-lg">
            <thead>
              <tr>
              <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-left">Image</th>
               
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-[#3a4b5b] border-b">
                    <td className="px-4 py-2 text-center">{user.name}</td>
                    <td className="px-4 py-2 text-center">{user.email}</td>
                    <td className="px-4 py-2 text-center">{user.role}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-3 py-1 rounded-full  text-xs font-semibold ${getStatusBadge(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-2 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="bg-[#2e3e4e] rounded-lg shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-all flex justify-between items-center"
              >
                {/* User Image */}
                <div className="flex-shrink-0">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>

                {/* User Info in Flex Mode */}
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-white text-left">{user.name}</h2>
                  <p className="text-gray-300 text-sm text-left">{user.email}</p>
                  <p className="text-gray-300 text-sm text-left">{user.role}</p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(user.status)}`}
                >
                  {user.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Userlist;

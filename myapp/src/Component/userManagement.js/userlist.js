// import React, { useEffect, useState } from "react";
// import noor from "../Media/noor.jpeg";
// import { useDispatch, useSelector } from "react-redux";
// import { allUser } from "../../FeatureRedux/alluserSlice";
// import EditUserModal from "./editusermodal";

// function Userlist() {
//   const [viewMode, setViewMode] = useState("grid");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [showOptions, setShowOptions] = useState(null); // Track which user's options are shown

//   const dispatch = useDispatch();
//   const { users, isLoading, isError, errorMessage } = useSelector(
//     (state) => state.allUser
//   );

//   useEffect(() => {
//     console.log("Fetching users...");
//     dispatch(allUser());
//   }, [dispatch]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-500 text-white";
//       case "Inactive":
//         return "bg-gray-400 text-white";
//       case "Pending":
//         return "bg-yellow-500 text-white";
//       default:
//         return "bg-gray-400 text-white";
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     return (
//       (filterStatus === "" || user.status === filterStatus) &&
//       (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   const handleActionClick = (userId) => {
//     setShowOptions(showOptions === userId ? null : userId); // Toggle the visibility for the specific user
//   };

//   return (
//     <div className="p-6 bg-[#2e3e4d]">
//       {/* Controls */}
//       <div className="flex items-center justify-end mb-6 gap-4">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           className="px-4 py-2 rounded-md border border-gray-500 bg-[#2e3e4e] text-white focus:outline-none w-full sm:w-64"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Filter Dropdown */}
//         <select
//           className="px-4 py-2 rounded-md border border-gray-500 bg-[#2e3e4e] text-white focus:outline-none"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="">All Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Pending">Pending</option>
//         </select>

//         {/* Toggle Button for Grid/List View */}
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105"
//           onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
//         >
//           {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
//         </button>
//       </div>

//       {/* Loading or Error Messages */}
//       {isLoading && <p>Loading...</p>}
//       {isError && <p className="text-red-500">Error: {errorMessage}</p>}

//       {/* User List */}
//       {!isLoading && !isError && (
//         <>
//           {viewMode === "list" ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-[#2e3e4e] text-white rounded-lg">
//                 <thead>
//                   <tr>
//                     <th className="px-4 py-2 text-center">Name</th>
//                     <th className="px-4 py-2 text-center">Email</th>
//                     <th className="px-4 py-2 text-center">Role</th>
//                     <th className="px-4 py-2 text-center">Status</th>
//                     <th className="px-4 py-2 text-left">Image</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map((user, index) => (
//                     <tr key={index} className="hover:bg-[#3a4b5b] border-b">
//                       <td className="px-4 py-2 text-center">{user.name}</td>
//                       <td className="px-4 py-2 text-center">{user.email}</td>
//                       <td className="px-4 py-2 text-center">{user.role}</td>
//                       <td className="px-4 py-2 text-center">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
//                             user.status
//                           )}`}
//                         >
//                           {user.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2">
//                         <img
//                           src={user.image || noor}
//                           alt={user.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                       </td>
//                       <td className="px-4 py-2">
//                         <div
//                           className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
//                           onClick={() => handleActionClick(user.id)} // Pass the user's ID
//                         >
//                           Action
//                         </div>

//                         {showOptions === user.id && (
//                           <div className="mt-2">
//                             <EditUserModal />
//                             <button
//                               className="px-2 py-1 rounded-md text-sm text-white ml-2"
//                               onClick={() => console.log('Delete')}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredUsers.map((user, index) => (
//                 <div
//                   key={index}
//                   className="bg-[#2e3e4e] rounded-lg shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-all flex justify-between items-center"
//                 >
//                   <img
//                     src={user.image || noor}
//                     alt={user.name}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                   <div className="flex-1 ml-4">
//                     <h2 className="text-lg font-semibold text-white">
//                       {user.name}
//                     </h2>
//                     <p className="text-gray-300 text-sm">{user.email}</p>
//                   </div>
//                   <div>
//                     <div
//                       className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
//                       onClick={() => handleActionClick(user.id)} // Pass the user's ID
//                     >
//                       Action
//                     </div>

//                     {showOptions === user.id && (
//                       <div className="mt-2">
//                         <EditUserModal />
//                         <button
//                           className="px-2 py-1 rounded-md text-sm text-white ml-2"
//                           onClick={() => console.log('Delete')}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
//                       user.status
//                     )}`}
//                   >
//                     {user.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default Userlist;



import React, { useEffect, useState } from "react";
import noor from "../Media/noor.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";
import EditUserModal from "./editusermodal";

function Userlist() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showOptions, setShowOptions] = useState({}); // Track visibility for each user

  const dispatch = useDispatch();
  const { users, isLoading, isError, errorMessage } = useSelector(
    (state) => state.allUser
  );

  useEffect(() => {
    console.log("Fetching users...");
    dispatch(allUser());
  }, [dispatch]);

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

  const filteredUsers = users.filter((user) => {
    return (
      (filterStatus === "" || user.status === filterStatus) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleActionClick = (userId) => {
    setShowOptions((prev) => ({
      ...prev,
      [userId]: !prev[userId], // Toggle the visibility of the clicked user's options
    }));
  };

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

      {/* Loading or Error Messages */}
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {errorMessage}</p>}

      {/* User List */}
      {!isLoading && !isError && (
        <>
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#3a4b5b] border-b">
                     
                     <td className="px-4 py-2 text-center">{user.name}</td>
                    

                      <td className="px-4 py-2 text-center">{user.email}</td>
                      <td className="px-4 py-2 text-center">{user.role}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={user.image || noor}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div
                          className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                          onClick={() => handleActionClick(user.id)} // Pass the user's ID
                        >
                          Action
                        </div>

                        {showOptions[user.id] && ( // Check if options are visible for this user
                          <div className="mt-2">
                            <EditUserModal formData={user} />
                            <button
                              className="px-2 py-1 rounded-md text-sm text-white ml-2"
                              onClick={() => console.log("Delete")}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-[#2e3e4e] rounded-lg shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-all flex justify-between items-center"
                >
                  <img
                    src={user.image || noor}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold text-white">{user.name} </h2>
                   
                   
                    <p className="text-gray-300 text-sm">{user.email}</p>
                  </div>
                  <div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                      onClick={() => handleActionClick(user.id)} // Pass the user's ID
                    >
                      Action
                    </div>

                    {showOptions[user.id] && ( // Check if options are visible for this user
                      <div className="mt-2">
                        <EditUserModal formData={user} />
                        <button
                          className="px-2 py-1 rounded-md text-sm text-white ml-2"
                          onClick={() => console.log("Delete")}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Userlist;

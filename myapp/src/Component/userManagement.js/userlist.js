import React, { useEffect, useState } from "react";
import noor from "../Media/noor.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";
import EditUserModal from "./editusermodal";
import { getCompany } from "../../FeatureRedux/companySlice/getCompanyslice";
import Avatar from "react-avatar";
import UserdetailsForm from "./UserdetailsForm";
import { deleteUser } from "../../FeatureRedux/user/delteuserslice";
import Swal from 'sweetalert2';

function Userlist() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectUserId, setSelectedUserId] = useState(null);
  const [showOptions, setShowOptions] = useState({}); // Track visibility for each user

  const dispatch = useDispatch();
  const { users, isLoading, isError, errorMessage } = useSelector(
    (state) => state.allUser
  );

  useEffect(() => {
    console.log("Fetching users...");
    dispatch(allUser());
  }, [dispatch]);

  const handleDeleteUser = async (userId) => {
    // Show a SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await dispatch(deleteUser({ userId })).unwrap();
        // After deleting, fetch users again
        dispatch(allUser());
        // Show success alert with automatic close after 1.5s
        Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted.',
          icon: 'success',
          timer: 1000, // Auto-close after 1.5 seconds
          showConfirmButton: false, // Hide confirm button
        });
      } catch (error) {
        console.error("Failed to delete user:", error);
        Swal.fire('Error!', error || 'Failed to delete user', 'error');
      }
    }
  };
  
  
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

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const { data1 } = useSelector((state) => state.getCompany);

  const company = data1.data1?.find((c) => c._id === filteredUsers.Company);

  const handleActionClick = (userId) => {
    setShowOptions((prev) => ({
      ...prev,
      [userId]: !prev[userId], // Toggle the visibility of the clicked user's options
    }));
  };

  return (
    <div className="p-6 bg-[#2e3e4d] ">
      {/* Controls */}
      <div className="flex flex-row justify-between">
      <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
    Total Users
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-md font-bold shadow-lg">
      {filteredUsers.length}
    </span>
  </h2>
</div>


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
                    <tr key={user._id} className="hover:bg-[#3a4b5b] border-b">
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
                        {/* <img
                          src={user.image || noor}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        /> */}
                        <Avatar
                          name={user.name}
                          src={user.profile_image}
                          size="50"
                          round={true}
                          className="text-sm font-medium"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div
                          className="px-3 py-1  rounded-full text-xs font-semibold cursor-pointer"
                          onClick={() => {
                            console.log(
                              "hua ye user ki id yaha pemap ke ander" + user._id
                            );
                            handleActionClick(user._id);
                          }}
                          // Pass the user's ID
                        >
                          Action
                        </div>

                        {showOptions[user.id] && ( // Check if options are visible for this user
                          <div className="mt-2">
                            <EditUserModal formData={user} />
                            <button
                              className="px-2 py-1 rounded-md text-sm text-white ml-2"
                              onClick={() => handleDeleteUser(user._id)}
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
              {filteredUsers.map((user) => {
                const companyId =
                  typeof user.Company === "string"
                    ? user.Company
                    : user.Company?._id;
                const company = Array.isArray(data1)
                  ? data1.find((c) => c._id === companyId)
                  : data1?.data1?.find((c) => c._id === companyId);
                const companyName = company?.company_name || "Unknown Company";

                return (
                  <div
                    key={user._id}
                    className="relative bg-[#2e3e4e] rounded-lg shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-all flex justify-between items-center"
                  >
                    <p className="absolute text-gray-400 left-1 top-1 text-sm">
                      {companyName}
                    </p>

                    {/* <img
                      src={user.image || noor}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    /> */}
                    <Avatar
                      name={user.name}
                      src={user.profile_image}
                      size="70"
                      round={true}
                      className="text-sm font-medium"
                    />
                    <div className="flex-1 ml-4">
                      <h2 className="text-lg font-semibold text-white">
                        {user.name} {user.last_name}
                      </h2>

                      <p className="text-gray-300 text-sm">{user.email}</p>
                      <p className="text-gray-400 text-sm">
                        Contact-{user.phone}
                      </p>
                    </div>
                    <div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold cursor-pointer text-red-500"
                        onClick={() => {
                          console.log(
                            "thisis user id ki pass ye user ki id filtered user" +
                              user._id
                          );
                          handleActionClick(user._id);
                        }} // Pass the user's ID
                      >
                        Action
                      </div>

                      {showOptions[user._id] && ( // Check if options are visible for this user
                        <div className="mt-2">
                          <EditUserModal formData={user} />
                          <button
                            className="px-2 py-1 rounded-md text-sm text-white ml-2"
                            onClick={() => handleDeleteUser(user._id)}
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
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={(e) => setSelectedUserId(user._id)}
                        className="px-3 py-1 text-white text-[10px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
                      >
                        SHOW USER DETAIL
                      </button>
                      {selectUserId === user._id && (
                        <UserdetailsForm
                          userId={user._id}
                          companyList={data1}
                          userDetails={filteredUsers}
                          onClose={() => setSelectedUserId(null)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Userlist;

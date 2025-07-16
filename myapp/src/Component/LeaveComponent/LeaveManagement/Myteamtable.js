import React, { useState } from "react";
import {
  FiEye,
  FiX,
  FiUser,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLeavebyCompany } from "../../../FeatureRedux/leaveSlice/getALLleavebyCompany";
import { updateLeaveStatus } from "../../../FeatureRedux/leaveSlice/editStatusLeaveByCompanySlice";

const Myteamtable = () => {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const dispatch = useDispatch();
  const { getData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.getLeavebyCompany
  );

  useEffect(() => {
    dispatch(getLeavebyCompany());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusChange = (newStatus, leave) => {
    if (!leave) return;
    dispatch(
      updateLeaveStatus({
        userId: leave.userId,
        leaveId: leave._id,
        status: newStatus,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getLeavebyCompany());
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Failed to update leave status:", err);
      });
  };

  // Process and filter the leaves data
  const flattenedLeaves = getData?.data?.flatMap((entry) =>
    entry.leavesTaken.map((leave) => ({
      ...leave,
      employeeName: entry.userId.name,
      userId: entry.userId._id,
      employeeEmail: entry.userId.email, // Added for modal
      employeePosition: entry.userId.position // Added for modal
    }))
  ) || [];

  // Sort leaves: Pending first, then Rejected, then Approved
  const sortedLeaves = [...flattenedLeaves].sort((a, b) => {
    const statusOrder = { Pending: 1, Rejected: 2, Approved: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Filter leaves based on status filter
  const filteredLeaves = sortedLeaves.filter(leave => {
    if (statusFilter === "All Status") return true;
    return leave.status === statusFilter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaves.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FiCheckCircle className="text-emerald-500" />;
      case "Pending":
        return <FiClock className="text-amber-500" />;
      case "Rejected":
        return <FiAlertCircle className="text-rose-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Main Table */}
      <div className="mt-6 bg-white rounded-xl shadow-emerald-600 border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave Requests
          </h2>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="text-xs border rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="text-xs border rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center">Employee</th>
                <th className="px-4 py-3 text-center">Leave Type</th>
                <th className="px-4 py-3 text-center">Dates</th>
                <th className="px-4 py-3 text-center">Days</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Reason</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {currentItems.map((leave) => (
                <tr key={leave._id}>
                  <td className="px-4 py-3 text-center font-medium text-gray-900">
                    {leave.employeeName}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">
                    {leave.type}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {formatDate(leave.fromDate)} - {formatDate(leave.toDate)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {leave.days} {leave.days > 1 ? "days" : "day"}
                    </span>
                  </td>
                  <td className="px-1 py-1 text-center">
                    <select
                      value={leave.status}
                      onChange={(e) => handleStatusChange(e.target.value, leave)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border ${
                        leave.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : leave.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center max-w-xs truncate">
                    
                 
  {leave.reason
    ? leave.reason.length > 15
      ? `${leave.reason.slice(0, 15)}...`
      : leave.reason
    : "No reason provided"}

                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedLeave(leave);
                        setIsModalOpen(true);
                      }}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center text-xs text-gray-500">
          <div>
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredLeaves.length)}
            </span>{" "}
            of <span className="font-medium">{filteredLeaves.length}</span>{" "}
            entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Leave Details Modal */}
{isModalOpen && selectedLeave && (
  <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-40 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b bg-gradient-to-r from-blue-50 to-blue-100">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FiUser className="text-blue-500" />
          Leave Request Details
        </h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-red-500 transition duration-150"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Employee Name</p>
            <p className="font-medium">{selectedLeave.employeeName}</p>
          </div>
          <div>
            <p className="text-gray-500">Leave Type</p>
            <p className="font-medium">{selectedLeave.type}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">From Date</p>
            <p className="font-medium flex items-center gap-2">
              <FiCalendar className="text-blue-500 justify-center text-center" />
              {formatDate(selectedLeave.fromDate)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">To Date</p>
            <p className="font-medium flex items-center gap-2">
              <FiCalendar className="text-blue-500 text-center" />
              {formatDate(selectedLeave.toDate)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Total Days</p>
          <p className="font-medium">
            {selectedLeave.days} {selectedLeave.days > 1 ? "days" : "day"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <div className="flex items-center gap-2 mt-1">
            {getStatusIcon(selectedLeave.status)}
            <span
              className={`font-semibold ${
                selectedLeave.status === "Approved"
                  ? "text-green-600"
                  : selectedLeave.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {selectedLeave.status}
            </span>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Reason</p>
          <p className="font-medium mt-1">
            {selectedLeave.reason || "No reason provided"}
          </p>
        </div>

        {selectedLeave.notes && (
          <div>
            <p className="text-gray-500">Notes</p>
            <p className="font-medium mt-1">{selectedLeave.notes}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-3 p-5 border-t bg-gray-50">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Close
        </button>
        <select
          value={selectedLeave.status}
          onChange={(e) => {
            handleStatusChange(e.target.value, selectedLeave);
            setIsModalOpen(false);
          }}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition duration-150 cursor-pointer ${
            selectedLeave.status === "Approved"
              ? "bg-green-50 text-green-700 border-green-300"
              : selectedLeave.status === "Pending"
              ? "bg-yellow-50 text-yellow-700 border-yellow-300"
              : "bg-red-50 text-red-700 border-red-300"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Myteamtable;
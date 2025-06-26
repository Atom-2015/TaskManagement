import React, { useEffect, useMemo, useState } from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiActivity,
  FiUmbrella,
  FiAlertCircle,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft,
  FiCalendar,
} from "react-icons/fi";

import autoTable from "jspdf-autotable";

import LeaveDetailsModal from "./LeaveDetailModal";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveUser } from "../../FeatureRedux/leaveSlice/getLeaveUserSlice";
import jsPDF from "jspdf";

const LeaveTable = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveDataState, setLeaveDataState] = useState([]);

  const { getData, isLoading, isError } = useSelector(
    (state) => state.getLeaveUser
  );

  useEffect(() => {
    dispatch(getLeaveUser());
  }, [dispatch]);

  useEffect(() => {
    if (getData?.data?.leavesTaken) {
      setLeaveDataState([...getData.data.leavesTaken].reverse());
    }
  }, [getData]);

  const leaveData = useMemo(() => {
    return [...(getData?.data?.leavesTaken || [])].reverse();
  }, [getData]);

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setLeaveDataState((prev) =>
      prev.map((item, index) =>
        item === selectedLeave ? { ...item, status: newStatus } : item
      )
    );
    setSelectedLeave((prev) => ({ ...prev, status: newStatus }));
    setIsModalOpen(false);
  };

  const filterData = leaveDataState.filter((leave) =>
    leave.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusStyles = (status) => {
    const base =
      "px-1 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 border";
    switch (status) {
      case "Approved":
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case "Pending":
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case "Rejected":
        return `${base} bg-rose-50 text-rose-700 border-rose-200`;
      default:
        return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FiCheck className="text-emerald-500" />;
      case "Pending":
        return <FiClock className="text-amber-500" />;
      case "Rejected":
        return <FiX className="text-rose-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const paginatedData = filterData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

const generateAllLeavesPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Your Leave Records", 14, 20);

  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

  const tableColumn = ["Type", "From Date", "To Date", "Days", "Status", "Reason"];
  const tableRows = [];

leaveDataState.forEach((leave) => {
  const leaveRow = [
    leave.type,
    formatDate(leave.fromDate),
    formatDate(leave.toDate),
    leave.days,
    leave.status,
    leave.reason && leave.reason.length > 30
      ? leave.reason.slice(0, 30) + "..."
      : leave.reason || "—",
  ];
  tableRows.push(leaveRow);
});

  autoTable(doc, {
    startY: 35,
    head: [tableColumn],
    body: tableRows,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 10 },
  });

  doc.save("Leave_Records.pdf");
};

  return (
    <div className="w-full">
      <div className="mt-6 bg-white rounded-xl shadow-md border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave Requests
          </h2>

      <button
  onClick={generateAllLeavesPDF}
  className="px-3 py-2 bg-green-200 text-black rounded-md text-sm hover:bg-green-400 transition"
>
  Download All as PDF
</button>

          

          <div className="flex items-center gap-2">
            <select className="text-xs border rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search by leave types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs border rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center">Leave Type</th>
                <th className="px-4 py-3 text-center">Dates</th>
                <th className="px-4 py-3 text-center">Days</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Reason</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {paginatedData.map((leave, index) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition">
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
                    <span className={getStatusStyles(leave.status)}>
                      {getStatusIcon(leave.status)} {leave.status}
                    </span>
                  </td>
                <td className="px-4 py-3 text-center max-w-xs truncate">
  {leave.reason && leave.reason.length > 15
    ? `${leave.reason.slice(0, 15)}...`
    : leave.reason || "—"}
</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewLeave(leave)}
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
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, leaveDataState.length)}
            </span>{" "}
            of <span className="font-medium">{leaveDataState.length}</span>{" "}
            entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedLeave && (
        <LeaveDetailsModal
          leave={selectedLeave}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default LeaveTable;

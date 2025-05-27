import React, { useState } from 'react';
import {
  FiEye, FiEdit2, FiTrash2, FiCheck, FiX, FiClock,
  FiChevronDown, FiChevronUp, FiActivity, FiUmbrella,
  FiAlertCircle, FiFileText, FiCheckCircle, FiXCircle,
  FiArrowLeft, FiCalendar
} from 'react-icons/fi';



const Myteamtable = () => {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      name: 'John Doe',
      type: 'Casual Leave',
      from: '2025-05-01',
      to: '2025-05-02',
      days: 2,
      status: 'Approved',
      reason: 'Personal work',
      notes: '',
    },
    {
      id: 2,
      name: 'Jane Smith',
      type: 'Sick Leave',
      from: '2025-05-05',
      to: '2025-05-06',
      days: 2,
      status: 'Pending',
      reason: 'Fever and rest',
      notes: '',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      type: 'Unpaid Leave',
      from: '2025-04-28',
      to: '2025-04-30',
      days: 3,
      status: 'Rejected',
      reason: 'Travel',
      notes: 'No available leave balance',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      type: 'Annual Leave',
      from: '2025-06-10',
      to: '2025-06-15',
      days: 5,
      status: 'Approved',
      reason: 'Vacation with family',
      notes: '',
    },
  ]);

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    setLeaveData((prev) =>
      prev.map((item) =>
        item.id === selectedLeave.id ? { ...item, status: newStatus } : item
      )
    );
    setSelectedLeave((prev) => ({ ...prev, status: newStatus }));
    setIsModalOpen(false);
  };

  const getStatusStyles = (status) => {
    const base = 'px-1 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 border';
    switch (status) {
      case 'Approved':
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case 'Pending':
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case 'Rejected':
        return `${base} bg-rose-50 text-rose-700 border-rose-200`;
      default:
        return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <FiCheck className="text-emerald-500" />;
      case 'Pending': return <FiClock className="text-amber-500" />;
      case 'Rejected': return <FiX className="text-rose-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full">
      <div className="mt-6 bg-white rounded-xl shadow-emerald-600 border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Leave Requests</h2>
          <div className="flex items-center gap-2">
            <select className="text-xs border rounded-lg px-3 py-2 text-gray-600 focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
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
              {leaveData.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center font-medium text-gray-900">
                    {leave.name}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">{leave.type}</td>
                  <td className="px-4 py-3 text-center">
                    {formatDate(leave.from)} - {formatDate(leave.to)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {leave.days} {leave.days > 1 ? 'days' : 'day'}
                    </span>
                  </td>
                  <td className="px-1 py-1 text-center">
                    <span className={getStatusStyles(leave.status)}>
                      {getStatusIcon(leave.status)} {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center max-w-xs truncate">{leave.reason}</td>
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
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{leaveData.length}</span> of{" "}
            <span className="font-medium">{leaveData.length}</span> entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* {isModalOpen && selectedLeave && (
        <LeaveDetailsModal
          leave={selectedLeave}
          onClose={() => setIsModalOpen(false)}
          onStatusChange={handleStatusChange}
        />
      )} */}
    </div>
  );
};

export default Myteamtable;

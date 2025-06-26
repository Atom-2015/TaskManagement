import React from 'react';
import { 
  FiX, FiClock, FiActivity, FiUmbrella, 
  FiAlertCircle, FiFileText, FiCheckCircle, 
  FiXCircle, FiEdit2, FiCalendar 
} from 'react-icons/fi';

const LeaveDetailsModal = ({ leave, onClose, onStatusChange }) => {
  const getStatusStyles = (status) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border';
    switch (status) {
      case 'Approved': return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case 'Pending': return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case 'Rejected': return `${base} bg-rose-50 text-rose-700 border-rose-200`;
      default: return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <FiCheckCircle className="text-red-600" />;
      case 'Pending': return <FiClock className="text-blue-500" />;
      case 'Rejected': return <FiXCircle className="text-gray-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl transform transition-all duration-300 ease-out animate-scaleIn overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Leave Request Details</h3>
              {/* <p className="text-xs text-blue-100 mt-1">Request ID: #{leave.id}</p> */}
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Employee Info */}
          <p className="text-base font-medium text-gray-800 flex items-center gap-2">
  <FiCalendar className="text-indigo-500" />
  {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
</p>


          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</p>
              <p className="text-base font-medium text-gray-800 flex items-center gap-2">
                {leave.type === 'Sick Leave' ? (
                  <FiActivity className="text-rose-500" />
                ) : leave.type === 'Annual Leave' ? (
                  <FiUmbrella className="text-blue-500" />
                ) : (
                  <FiAlertCircle className="text-amber-500" />
                )}
                {leave.type}
              </p>
            </div>
            
            <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</p>
              <p className="text-base font-medium text-gray-800 flex items-center gap-2">
                <FiCalendar className="text-indigo-500" />
                {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
              </p>
            </div>
            
            <div className="space-y-1 p-1 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</p>
              <p className="text-base font-medium text-blue-600 flex items-center gap-2">
                <FiClock className="text-blue-400" />
                {leave.days} {leave.days > 1 ? 'days' : 'day'}
              </p>
            </div>
            
            <div className="space-y-1 p-1 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
              <div className="flex items-center gap-2">
                {getStatusIcon(leave.status)}
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${getStatusStyles(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <FiAlertCircle className="text-gray-400" /> Reason
            </p>
            <div className="p-1 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-gray-800">{leave.reason}</p>
            </div>
          </div>

          {/* Notes Section (conditional) */}
          {leave.notes && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <FiFileText className="text-gray-400" /> Additional Notes
              </p>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-amber-800">{leave.notes}</p>
              </div>
            </div>
          )}

          {/* Status Actions */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <p className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
              <FiEdit2 className="text-gray-400" /> Change Leave Status
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onStatusChange('Approved')}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm ${
                  leave.status === 'Approved' 
                    ? 'bg-emerald-500 text-white border border-emerald-600 hover:bg-emerald-600'
                    : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                <FiCheckCircle className="w-4 h-4" />
                Approve
              </button>
              
              <button
                onClick={() => onStatusChange('Pending')}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm ${
                  leave.status === 'Pending' 
                    ? 'bg-blue-500 text-white border border-blue-600 hover:bg-blue-600'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                <FiClock className="w-4 h-4" />
                Mark Pending
              </button>
              
              <button
                onClick={() => onStatusChange('Rejected')}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm ${
                  leave.status === 'Rejected' 
                    ? 'bg-rose-500 text-white border border-rose-600 hover:bg-rose-600'
                    : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300'
                }`}
              >
                <FiXCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsModal;
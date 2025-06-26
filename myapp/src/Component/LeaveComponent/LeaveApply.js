import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { applyLeaveUser } from '../../FeatureRedux/leaveSlice/applyLeaveSlice';
import Swal from 'sweetalert2';
import { getLeaveUser } from '../../FeatureRedux/leaveSlice/getLeaveUserSlice';

const LeaveApply = ({ onClose }) => {
  const dispatch= useDispatch();



  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 30;

  const {postData:leaveData,isLoading,isError} = useSelector((state) => state.applyLeaveUser);


  const leaveTypes = [
    { title: "Casual Leave", dotColor: "bg-purple-500" },
    { title: "Sick Leave", dotColor: "bg-indigo-500" },
    { title: "Unpaid Leave", dotColor: "bg-red-500" },
    { title: "Half Leave", dotColor: "bg-blue-500" },
  ];

  const handleReasonChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setReason(value);
      setCharCount(value.length);
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedLeaveType || !fromDate || !toDate || !reason.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Fields',
      text: 'Please fill out all fields before submitting.',
    });
    return;
  }

  const leaveData = {
    leaveType: selectedLeaveType.toUpperCase().split(" ")[0],
    fromDate,
    toDate,
    reason,
  };

try {
  const res = await dispatch(applyLeaveUser(leaveData)).unwrap();

  Swal.fire({
    icon: 'success',
    title: 'Leave Applied',
    text: res.message || 'Leave applied successfully!',
    timer: 2000,
    showConfirmButton: false,
  });
  dispatch(getLeaveUser());

  onClose();
} catch (error) {
  Swal.fire({
    icon: 'error',
    title: 'Failed to Apply',
    text: error?.message || 'Something went wrong. Try again later.',
  });
}

};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        
        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Apply for Leave</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <div className="grid grid-cols-2 gap-3">
              {leaveTypes.map((type) => (
                <button
                  type="button"
                  key={type.title}
                  onClick={() => setSelectedLeaveType(type.title)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm ${
                    selectedLeaveType === type.title
                      ? 'bg-blue-100 border-blue-500 text-blue-600 font-semibold'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${type.dotColor}`}></span>
                  {type.title}
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Apply To */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apply To</label>
            <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Team Lead</option>
              <option>Manager</option>
              <option>HR</option>
            </select>
          </div> */}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <div className="relative">
              <textarea
                value={reason}
                onChange={handleReasonChange}
                rows={4}
                placeholder="Ex: I am travelling to..."
                className="w-full p-2.5 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <span className={`absolute bottom-2 right-2 text-xs ${
                charCount === maxCharCount ? 'text-red-500' : 'text-gray-500'
              }`}>
                {charCount}/{maxCharCount}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApply;

import React from 'react';

const PayrolModal = ({
  emp,
  payrollEntry,
  newIncentive,
  setNewIncentive,
  onClose,
  position
}) => {
  return (
    <>
      {/* Backdrop to close modal when clicking outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      <div
        className="fixed bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50"
        style={{
        
          left: `50%`,
          minWidth: '300px',
          maxWidth: '400px',
          // Ensure modal stays within viewport
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div className="relative">
          {/* Arrow pointing to the eye icon */}
          <div 
            className="absolute w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-200"
            style={{ 
              top: '12px',
              left: '-6px',
              zIndex: -1 
            }}
          />
          
          {/* Close button */}
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            onClick={onClose}
          >
            ×
          </button>
          
          <h3 className="text-base font-semibold mb-3 pr-6">
            Payroll Details - {emp.name} {emp.last_name}
          </h3>
          
          {/* Employee basic info */}
          <div className="mb-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium">{emp.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Salary:</span>
              <span className="font-medium">
                ₹{typeof emp?.earnings?.salary === "number" 
                  ? emp.earnings.salary 
                  : typeof emp?.salary === "number" 
                  ? emp.salary 
                  : "0.00"}
              </span>
            </div>
            {payrollEntry && (
              <div className="flex justify-between">
                <span className="text-gray-600">Net Pay:</span>
                <span className="font-medium text-green-600">
                  ₹{payrollEntry.netPay?.toFixed(2) ?? "0.00"}
                </span>
              </div>
            )}
          </div>
          
          {/* Existing Incentives */}
          {payrollEntry?.earnings?.incentives?.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Incentives:</h4>
              <div className="space-y-1">
                {payrollEntry.earnings.incentives.map((inc, i) => (
                  <div key={i} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                    <span>{inc.label}</span>
                    <span className="font-medium">₹{Number(inc.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add Incentive Form */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-2">Add New Incentive</label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Incentive Label"
                value={newIncentive.label}
                onChange={(e) =>
                  setNewIncentive({ ...newIncentive, label: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newIncentive.amount}
                onChange={(e) =>
                  setNewIncentive({ ...newIncentive, amount: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              className="mt-2 w-full bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => {
                if (newIncentive.label && newIncentive.amount) {
                  alert(`Incentive added: ${newIncentive.label} ₹${newIncentive.amount}`);
                  setNewIncentive({ label: "", amount: "" });
                } else {
                  alert('Please fill in both label and amount');
                }
              }}
              disabled={!newIncentive.label || !newIncentive.amount}
            >
              Add Incentive
            </button>
          </div>
          
          {/* Deductions info if available */}
          {payrollEntry?.deductions && (
            <div className="text-sm bg-red-50 p-2 rounded">
              <h4 className="font-medium text-red-700 mb-1">Deductions:</h4>
              <div className="text-red-600 space-y-1">
                <div>Absent Days: {payrollEntry.deductions.absentDays || 0}</div>
                <div>Unpaid Leaves: {payrollEntry.deductions.unpaidLeaves || 0}</div>
                <div>Total Deducted: ₹{Number(payrollEntry.deductions.totalDeductions || 0).toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayrolModal;
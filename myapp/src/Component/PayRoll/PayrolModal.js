import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPayrollIncentive } from "../../FeatureRedux/PayrollSlice/PayrollCompanyIncetiveAdd";
import { deletePayrollIncentive } from "../../FeatureRedux/PayrollSlice/PayrollCompanyDeleteIncentiveSLice";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getCompanyMonthlySalary } from "../../FeatureRedux/PayrollSlice/PayrollCompanyGraphSlice";
import { getMonthlyPayrollSummary } from "../../FeatureRedux/PayrollSlice/PayrollCompanyMonthlySalary";

const PayrolModal = ({
  emp,
  payrollEntry,
  month,
  year,
  payrollId,
  newIncentive,
  setNewIncentive,
  onClose,
  position,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Payroll ID received in modal:", payrollId);
  // }, [payrollId]);

 
  const handleAddIncentive = async () => {
    if (!newIncentive.label || !newIncentive.amount) {
      toast.warning("Please fill in both label and amount");
      return;
    }

    try {
      await dispatch(
        addPayrollIncentive({
          payrollId,
          incentiveData: {
            label: newIncentive.label,
            amount: Number(newIncentive.amount),
          },
        })
      ).unwrap();

      toast.success(`Incentive added: ${newIncentive.label} ₹${newIncentive.amount}`);
      setNewIncentive({ label: "", amount: "" });

      // Refresh payroll summary
      dispatch(getMonthlyPayrollSummary({ month, year }));

      onClose(); // optional
    } catch (err) {
      toast.error("Failed to add incentive");
    }
  };

  const handleDeleteIncentive = async (incentiveId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this incentive?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deletePayrollIncentive(incentiveId)).unwrap();
        Swal.fire("Deleted!", "Incentive has been deleted.", "success");

        // Refresh payroll summary
        dispatch(getMonthlyPayrollSummary({ month, year }));

        onClose(); // optional
      } catch (err) {
        Swal.fire("Failed!", "Error deleting incentive.", "error");
      }
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className="fixed bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50"
        style={{
          left: `50%`,
          minWidth: "300px",
          maxWidth: "400px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="relative">
          <div
            className="absolute w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-200"
            style={{
              top: "12px",
              left: "-6px",
              zIndex: -1,
            }}
          />

          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            onClick={onClose}
          >
            ×
          </button>

          <h3 className="text-base font-semibold mb-3 pr-6">
            Payroll Details - {emp.name} {emp.last_name}
          </h3>

          <div className="mb-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium">{emp.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Salary:</span>
              <span className="font-medium">
                ₹
                {typeof emp?.earnings?.salary === "number"
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

          {payrollEntry?.earnings?.incentives?.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Current Incentives:
              </h4>
              <div className="space-y-1">
                {payrollEntry.earnings.incentives.map((inc, i) => (
                  <div
                    key={inc._id || i}
                    className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                  >
                    <div>
                      <span>{inc.label}</span>{" "}
                      <span className="font-medium ml-2">
                        ₹{Number(inc.amount).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteIncentive(inc._id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                      title="Delete"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Add New Incentive
            </label>
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
              onClick={handleAddIncentive}
              disabled={!newIncentive.label || !newIncentive.amount}
            >
              Add Incentive
            </button>
          </div>

          {payrollEntry?.deductions && (
            <div className="text-sm bg-red-50 p-2 rounded">
              <h4 className="font-medium text-red-700 mb-1">Deductions:</h4>
              <div className="text-red-600 space-y-1">
                <div>Absent Days: {payrollEntry.deductions.absentDays || 0}</div>
                <div>Unpaid Leaves: {payrollEntry.deductions.unpaidLeaves || 0}</div>
                <div>
                  Total Deducted: ₹
                  {Number(payrollEntry.deductions.totalDeductions || 0).toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayrolModal;

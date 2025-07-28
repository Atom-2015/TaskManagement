// src/components/PayrollTable.js
import React, { useEffect, useState } from "react";
import { FiEye, FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../../FeatureRedux/alluserSlice";
import { generatePayroll } from "../../FeatureRedux/PayrollSlice/PayrollCompanyGenerate";
import moment from "moment";
import { getMonthlyPayrollSummary } from "../../FeatureRedux/PayrollSlice/PayrollCompanyMonthlySalary";
import PayrolModal from "./PayrolModal";
import { addPayrollIncentive } from "../../FeatureRedux/PayrollSlice/PayrollCompanyIncetiveAdd";

const ITEMS_PER_PAGE = 5;

const PayrollTable = () => {
  const dispatch = useDispatch();
  const { users, isLoading: userLoading } = useSelector(
    (state) => state.allUser
  );
  const {
    data: payrollData,
    isLoading: payrollLoading,
    isError,
    isSuccess,
    message,
    errorMessage,
  } = useSelector((state) => state.getMonthlyPayrollSummary);

  const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [processingUserId, setProcessingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openIncentiveFormFor, setOpenIncentiveFormFor] = useState(null);
  const [newIncentive, setNewIncentive] = useState({ label: "", amount: "" });
  const [viewPayrollFor, setViewPayrollFor] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getMonthlyPayrollSummary({ month: selectedMonth, year: selectedYear })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const handleGeneratePayrollForUser = async (userId) => {

    setProcessingUserId(userId);
     const response = await dispatch(
    generatePayroll({
      userId,
      month: selectedMonth,
      year: selectedYear,
    })
  );

  console.log("Generated payroll response:", response);
    await dispatch(
      getMonthlyPayrollSummary({ month: selectedMonth, year: selectedYear })
    );
    setProcessingUserId(null);
  };


//   const handleGeneratePayrollForUser = async (userId) => {
//   console.log("Generating payroll for userId:", userId);
//   setProcessingUserId(userId);

//   const generateResult = await dispatch(
//     generatePayroll({
//       userId,
//       month: selectedMonth,
//       year: selectedYear,
//     })
//   );

//   console.log("Payroll generation result:", generateResult);

//   const summaryResult = await dispatch(
//     getMonthlyPayrollSummary({ month: selectedMonth, year: selectedYear })
//   );

//   console.log("getMonthlyPayrollSummary response:", summaryResult);
//   console.log("Payroll summary payload:", summaryResult?.payload);

//   setProcessingUserId(null);
// };



  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const allowedMonths = () => {
    const selectedYearInt = parseInt(selectedYear);
    const monthCount = selectedYearInt === currentYear ? currentMonth : 12;
    return moment.months().map((month, idx) => {
      const monthNum = idx + 1;
      const isDisabled =
        selectedYearInt === currentYear && monthNum > currentMonth;
      return (
        <option
          key={month}
          value={String(monthNum).padStart(2, "0")}
          disabled={isDisabled}
        >
          {month}
        </option>
      );
    });
  };

  const filteredUsers = users.filter((emp) =>
    `${emp.name} ${emp.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (payrollData?.length > 0) {
      console.log("Full payrollData:", payrollData);
    }
  }, [payrollData]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payroll list</h2>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {allowedMonths()}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => {
              const newYear = e.target.value;
              setSelectedYear(newYear);
              if (
                parseInt(newYear) === currentYear &&
                parseInt(selectedMonth) > currentMonth
              ) {
                setSelectedMonth(String(currentMonth).padStart(2, "0"));
              }
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = currentYear - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search Employee"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
        />
      </div>

      {isSuccess && message && (
        <p className="text-green-600 text-sm mb-2">{message}</p>
      )}
      {isError && errorMessage && (
        <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Salary</th>

              <th className="px-4 py-2">Incentives</th>
              <th className="px-4 py-2">Net Pay</th>
              <th className="px-4 py-2">Deductions</th>
             
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userLoading || payrollLoading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No employees found
                </td>
              </tr>
            ) : (
              paginatedUsers.map((emp) => {
                const payrollEntry = payrollData?.find(
                  (p) => p.userId === emp._id
                );
                return (
                  <tr key={emp._id} className="border-t">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={emp.profile_image || "/default-user.png"}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-700">
                        {emp.name} {emp.last_name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-gray-400 mr-1">{emp.level}</span>
                      {emp.role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      ₹
                      {typeof emp?.earnings?.salary === "number"
                        ? emp.earnings.salary
                        : typeof emp?.salary === "number"
                        ? emp.salary
                        : "0.00"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-700 relative">
                      {/* + Icon in top-right */}

                      {/* Incentives display */}
                      <div className="flex flex-col gap-1 mt-1">
                        {payrollEntry?.earnings?.incentives?.length > 0 ? (
                          payrollEntry.earnings.incentives.map((inc, i) => (
                            <div key={i} className="text-xs text-gray-600">
                              {inc.label}: ₹{Number(inc.amount).toFixed(2)}
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-gray-400">
                            No incentives
                          </div>
                        )}

                        {/* Show incentive input form conditionally */}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-bold text-gray-700">
                      ₹{payrollEntry?.netPay?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="text-xs text-gray-500">
                        Absent: {payrollEntry?.deductions?.absentDays || 0},
                        Unpaid: {payrollEntry?.deductions?.unpaidLeaves || 0},
                        Deducted: ₹
                        {Number(
                          payrollEntry?.deductions?.totalDeductions || 0
                        ).toFixed(2)}
                      </div>
                    </td>
          

                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          payrollEntry
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payrollEntry ? "Completed" : "Pending"}
                      </span>
                    </td>
                    
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        className={`text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 ${
                          processingUserId === emp._id
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleGeneratePayrollForUser(emp._id)}
                        disabled={processingUserId === emp._id}
                      >
                        {processingUserId === emp._id
                          ? "Generating..."
                          : "Generate"}
                      </button>

                      <FiEye
                        className="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling

                          const rect = e.target.getBoundingClientRect();
                          const scrollTop =
                            window.pageYOffset ||
                            document.documentElement.scrollTop;
                          const scrollLeft =
                            window.pageXOffset ||
                            document.documentElement.scrollLeft;

                          // Modal dimensions (approximate)
                          const modalWidth = 300;
                          const modalHeight = 400;

                          // Viewport dimensions
                          const viewportWidth = window.innerWidth;
                          const viewportHeight = window.innerHeight;

                          // Calculate initial position (to the right of the eye icon)
                          let left = rect.right + scrollLeft + 500; // 10px gap from icon
                          let top = rect.top + scrollTop;

                          // Adjust horizontal position if modal would go off-screen
                          if (left + modalWidth > viewportWidth + scrollLeft) {
                            left = rect.left + scrollLeft - modalWidth - 10; // Position to the left instead
                          }

                          // Adjust vertical position if modal would go off-screen
                          if (top + modalHeight > viewportHeight + scrollTop) {
                            top = viewportHeight + scrollTop - modalHeight - 20; // 20px margin from bottom
                          }

                          // Ensure modal doesn't go above viewport
                          if (top < scrollTop + 20) {
                            top = scrollTop + 20; // 20px margin from top
                          }

                          setModalPosition({ top, left });
                          setViewPayrollFor(emp._id);
                        }}
                      />

                      {viewPayrollFor === emp._id && (
                        <PayrolModal
                          emp={emp}
                          month={selectedMonth}
                          year={selectedYear}
                          payrollEntry={payrollEntry}
                          payrollId={payrollEntry?.payrollId}
                          newIncentive={newIncentive}
                          setNewIncentive={setNewIncentive}
                          onClose={() => setViewPayrollFor(null)}
                          position={modalPosition}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;

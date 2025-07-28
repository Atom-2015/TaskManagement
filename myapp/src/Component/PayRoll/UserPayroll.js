import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAnnualSalarySummary } from "../../FeatureRedux/PayrollSlice/PaytollUserSlice";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const UserPayroll = () => {
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector((state) => state.getUserAnnualSalarySummary);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    dispatch(getUserAnnualSalarySummary({ year: selectedYear }));
  }, [dispatch, selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  // Generate years from current year to 3 years back
  const years = Array.from({ length: 3 }, (_, i) => currentYear - i).reverse();

  // Function to format month display
  const formatMonthDisplay = (month) => {
    const monthNumber = parseInt(month);
    if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
      return `${monthNames[monthNumber - 1]} (${month.toString().padStart(2, '0')})`;
    }
    return month;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Annual Payroll Summary</h1>
        
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">Select Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && summary.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Incentives</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.map((month) => (
                <tr key={month.month} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900">
                    {formatMonthDisplay(month.month)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">₹{month.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-left">
                    <div className="font-medium">₹{month.totalIncentives.toLocaleString()}</div>
                    {month.incentives.length > 0 && (
                      <ul className="mt-1 space-y-1 text-xs text-gray-500">
                        {month.incentives.map((i, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{i.label}:</span>
                            <span>₹{i.amount.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Absents:</span>
                        <span>{month.deductions.absentDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Unpaid Leaves:</span>
                        <span>{month.deductions.unpaidLeaves}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total Deductions:</span>
                        <span>₹{month.deductions.totalDeductions.toFixed(2)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left font-bold text-blue-600">
                    ₹{month.netPay.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && summary.length === 0 && !error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-700">No payroll data available for the selected year.</p>
        </div>
      )}
    </div>
  );
};

export default UserPayroll;
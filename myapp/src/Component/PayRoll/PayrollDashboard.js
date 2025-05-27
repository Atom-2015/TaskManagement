import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PayrollGraph from "./PayrollGraph";
import PayrollCircle from "./PayrollCircle";
import PayrollTable from "./PayrollTable";

const PayrollDashboard = () => {
  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div>
        <div>
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">PAYROLL</h1>

          {/* Month Picker */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1"></label>
              <input
                type="month"
                className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Payroll Cost */}
            <div className="bg-white text-left border flex flex-col border-gray-200 rounded-lg px-3 py-2 ">
              <p className="text-lg font-bold text-blue-700 mb-0">
                Payroll Cost
              </p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  ₹12,500
                </h2>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center text-green-600 font-medium text-xs">
                    <FiArrowUpRight className="mr-0.5 text-sm" /> +20%
                  </span>
                  <span className="text-gray-400 text-xs">last month</span>
                </div>
              </div>
            </div>

            {/* Total Expense */}
            <div className="bg-white text-left border flex flex-col border-gray-200 rounded-lg px-3 py-2 ">
              <p className="text-lg font-bold text-blue-700 mb-0">
                Total Expense
              </p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  ₹40,000
                </h2>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center text-blue-600 font-medium text-xs">
                    <FiArrowUpRight className="mr-0.5 text-sm" /> +10%
                  </span>
                  <span className="text-gray-400 text-xs">last month</span>
                </div>
              </div>
            </div>

            {/* Pending Payment */}
            <div className="bg-white text-left border flex flex-col border-gray-200 rounded-lg px-3 py-2 ">
              <p className="text-lg font-bold text-blue-700 mb-0">
                Pending Payment
              </p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">₹5,800</h2>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center text-red-600 font-medium text-xs">
                    <FiArrowUpRight className="mr-0.5 text-sm rotate-45" /> -5%
                  </span>
                  <span className="text-gray-400 text-xs">this month</span>
                </div>
              </div>
            </div>

            {/* Total Payroll */}
            <div className="bg-white text-left border flex flex-col border-gray-200 rounded-lg px-3 py-2 ">
              <p className="text-lg font-bold text-blue-700 mb-0">
                Total Payroll
              </p>
              <div className="flex items-center justify-between mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  ₹58,300
                </h2>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center text-green-600 font-medium text-xs">
                    <FiArrowUpRight className="mr-0.5 text-sm" /> +15%
                  </span>
                  <span className="text-gray-400 text-xs">last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Grap section*/}
        {/* Graph and Circle Section */}
        {/* Graph and Circle Section */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 h-[350px]">
          <div className="w-full md:w-2/3 h-full">
            <PayrollGraph />
          </div>
          <div className="w-full md:w-1/3 h-full">
            <PayrollCircle />
          </div>
        </div>

        <div className="mt-3">
            <div>
                <PayrollTable/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import PayrollGraph from "./PayrollGraph";
import PayrollCircle from "./PayrollCircle";
import PayrollTable from "./PayrollTable";
import {Link,Outlet,useLocation} from "react-router-dom"

const PayrollDashboard = () => {
  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const location=useLocation();
  const isActive=(path)=> location.pathname.includes(path)

  return (
     <div className="w-full min-h-screen justify-center bg-gray-50 p-6">
      <div className="flex justify-center gap-4 mb-6">
        <Link
          to="/Payroll/user"
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isActive("user")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          User Payroll
        </Link>
        <Link
          to="/Payroll/Company"
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isActive("Company")
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Company Payroll
        </Link>
      </div>

      <Outlet />
    </div>


  );
};

export default PayrollDashboard;

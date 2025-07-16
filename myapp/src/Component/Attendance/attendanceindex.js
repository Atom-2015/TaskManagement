import { DateFilterProvider } from "../UseContextHook/MonthYearFilter";
import CompanyAttendence from "./CompanyAttendence";
import UserAttendence from "./UserAttendence";
import { Outlet, NavLink, Link } from "react-router-dom";
function Attendanceindex() {
  return (
    <DateFilterProvider>
   <div className="min-h-screen bg-white w-full rounded-md p-4">

      <nav className="flex justify-center gap-4 mb-2">
        <NavLink
          to="user"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg text-sm font-semibold shadow 
          transition-all duration-200 border 
          ${
                isActive
              ? "bg-blue-600 text-white"
              : "bg-slate-300 text-blue-600 border-blue-600 hover:bg-blue-50"
          }`
          }
        >
          User Attendance
        </NavLink>

        <NavLink
          to="company"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg text-sm font-semibold shadow 
          transition-all duration-200 border 
          ${
            isActive
              ? "bg-green-600 text-white"
              : "bg-slate-300 text-green-600 border-green-600 hover:bg-green-50"
          }`
          }
        >
          Company
        </NavLink>
      </nav>
      <hr className="border border-gray-900"/>

      <Outlet />
    </div>
    </DateFilterProvider>
  );
}
export default Attendanceindex;

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
// import ProjectCost from './projectCost';  

function Taskindex() {
  return (
    <div>
      <nav className="text-white px-4 py-3 flex justify-between items-center shadow-md rounded-2xl ml-5">
        <div className="flex space-x-6">
          <NavLink
            to="/tasks/alltask"
            className={({ isActive }) =>
              `text-[17px] font-thin no-underline bg-teal-400 text-white px-2 py-1 rounded ${
                isActive ? 'no-underline' : ''
              }`
            }
          >
            Task Management
          </NavLink>
          <NavLink
            to="/tasks/projectdetails"
            className={({ isActive }) =>
              `text-[17px] font-thin no-underline bg-success text-white px-2 py-1 rounded ${
                isActive ? 'no-underline' : ''
              }`
            }
          >
            Project Details
          </NavLink>
          <NavLink
            to="/tasks/projectcost"  // ✅ Ensure route matches in your Router
            className={({ isActive }) =>
              `text-[17px] font-thin no-underline bg-danger text-white px-2 py-1 rounded ${
                isActive ? 'no-underline' : ''
              }`
            }
          >
            Project Cost
          </NavLink>
        </div>
      </nav>

      {/* Dynamic Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Taskindex;

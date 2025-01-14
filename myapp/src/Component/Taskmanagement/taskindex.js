import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Taskindex() {
  return (
    <div>
       
      <nav className="  text-white px-4 py-3 flex justify-between items-center shadow-md rounded-2xl ml-5 ">
         
        <div className="flex space-x-6">
          <NavLink
            to="/tasks/alltask"
            className={({ isActive }) =>
              `text-lg font-semibold hover:text-blue-400 transition ${
                isActive ? 'underline decoration-2 decoration-blue-400' : ''
              }`
            }
          >
            Task Management
          </NavLink>
          <NavLink
            to="/tasks/projectdetails"
            className={({ isActive }) =>
              `text-lg font-semibold hover:text-blue-400 transition ${
                isActive ? 'underline decoration-2 decoration-blue-400' : ''
              }`
            }
          >
            Project Details
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

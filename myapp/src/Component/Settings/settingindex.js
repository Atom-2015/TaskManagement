import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Settingindex() {
  return (
    <div>
      <nav className="bg-gray-100 p-4 shadow-md">
        <ul className="flex justify-around items-center list-none m-0 p-0">
          {[
            { label: 'Project', path: '/settings/prijectSetting' },
            { label: 'About', path: '/about' },
            { label: 'Services', path: '/services' },
            { label: 'Contact', path: '/contact' },
          ].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-800 font-bold text-lg hover:text-blue-600 transition ${
                    isActive ? 'underline decoration-2 decoration-blue-600' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Settingindex;

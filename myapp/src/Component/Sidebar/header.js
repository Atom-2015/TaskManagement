import React, { useState, useRef, useEffect } from 'react';
import ankit from '../Media/thumb-1920-665825.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function Header() {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const userName = "Ankit Hooda"; // Replace this dynamically if needed

  // Refs for detecting clicks outside dropdowns
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Function to close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifRef.current && !notifRef.current.contains(event.target) &&
        userRef.current && !userRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10 h-[70px] border-b-2 border-gray-600">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img 
          src="https://i0.wp.com/www.atomaviation.com/wp-content/uploads/2023/03/1__1_-removebg-preview.png?fit=451%2C481&ssl=1" 
          alt="Logo" 
          className="w-12 h-12" 
        />
      </div>

      {/* Right Side: Notification Bell & User Image */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={() => setNotifDropdownOpen(!isNotifDropdownOpen)}
          >
            <FontAwesomeIcon icon={faBell} className="text-white text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">3</span>
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-md py-2">
              <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">Pending Notifications</h3>
              <ul className="text-sm border-b border-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100">Task 1 - Due Soon</li>
                <li className="px-4 py-2 hover:bg-gray-100">Task 2 - Requires Review</li>
              </ul>
              <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">New Notifications</h3>
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100">New message from Admin</li>
                <li className="px-4 py-2 hover:bg-gray-100">System update completed</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Profile with Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center hover:bg-gray-600 focus:outline-none"
            onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
          >
            <img src={ankit} alt="User" className="w-8 h-8 rounded-full" />
          </button>

          {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2">
              <p className="px-4 py-2 text-sm font-medium">{userName}</p>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

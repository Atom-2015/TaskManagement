import React from 'react'
import ankit from '../Media/thumb-1920-665825.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function Header() {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10  h-[70px] shadow-[0px_0px_4px_2px_white,0px_10px_20px_rgba(0,0,0,0.4)]">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img 
          src="https://i0.wp.com/www.atomaviation.com/wp-content/uploads/2023/03/1__1_-removebg-preview.png?fit=451%2C481&ssl=1" 
          alt="Logo" 
          className="w-12 h-12" 
        />
      </div>

      {/* Right Side: Notification Bell and User Image */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {/* Notification Bell using FontAwesomeIcon */}
          <FontAwesomeIcon icon={faBell} className="text-white text-xl" />
          <span className="absolute top-0 right-0 text-xs text-red-500">3</span>  
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center">
          {/* Circle for User Image */}
          <img src={ankit} alt="User" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Header;

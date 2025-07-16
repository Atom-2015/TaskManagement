import React, { useState, useRef, useEffect } from 'react';
import AddMember from './AddMember/AddMember';
import Organisation from './Orgainsation/Organisation';
import Team from './Team/Team';
import { ChevronDown } from 'lucide-react';
import { RiTeamLine } from "react-icons/ri";
import { MdRememberMe } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";


function Settingindex() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting
    if (option === 'AddMember') {
      openAddModal(); // Open the modal if AddMember is selected
    }
  };

  return (
    <div className="p-4">
      {/* Dropdown Button */}
      <div className="relative w-[100%] inline-block" ref={dropdownRef}>
        <div className="w-[100%]">
          <button
            onClick={() => setIsOpen(!isOpen)} // Toggles dropdown
            className={`px-4 py-2 border-4 w-full rounded-lg font-semibold transition-all duration-300 ${
              isOpen
                ? 'bg-black text-white border-black shadow-lg scale-105' // Active state
                : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-700 hover:border-blue-700'
            }`}
          >
            <div className='justify-center flex flex-row'>
            My Team <span className='ml-2'> {<ChevronDown size={25}/> }  </span>
            </div>
          </button>
        </div>

        {/* Dropdown Menu with Smooth Transition */}
        {isOpen && (
          <div
            className={`absolute left-1/2 mt-2 gap-4 flex flex-row bg-white border shadow-lg p-2 rounded-xl transition-all duration-300 ease-in-out transform ${
              isOpen ? 'opacity-100 scale-100 translate-x-[-50%] translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <button
              onClick={() => handleOptionClick('Organisation')}
              className="px-4 py-2 border-2 rounded-3xl text-blue-500 border-blue-500 transition-all duration-300 hover:bg-blue-100 active:bg-blue-500 active:text-white"
            >
                 <div className='flex flex-row gap-2'>
              Organisation  <span className='flex items-center font-semibold'>< CgOrganisation/></span>
              </div>
            </button>
            <button
              onClick={() => handleOptionClick('Team')}
              className="px-4 py-2 border-2 rounded-3xl text-gray-500 border-gray-500 transition-all duration-300 hover:bg-gray-100 active:bg-gray-500 active:text-white"
            >
              <div className='flex flex-row gap-2'>
              Team  <span className='flex items-center font-semibold'><RiTeamLine /></span>
              </div>
            </button>
            <button
              onClick={() => handleOptionClick('AddMember')} // Only call handleOptionClick
              className="px-4 py-2 border-2 rounded-3xl text-green-500 border-green-500 transition-all duration-300 hover:bg-green-100 active:bg-green-500 active:text-white"
            >
               <div className='flex flex-row gap-2'>
              Add Member  <span className='flex items-center font-semibold'><MdRememberMe /></span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Conditionally Render Content Based on Selected Option */}
      {selectedOption === 'AddMember' && (
        <AddMember isModalOpen={isModalOpen} closemodal={closeModal} />
      )}
      {selectedOption === 'Organisation' && <Organisation />}
      {selectedOption === 'Team' && <Team />}
    </div>
  );
}

export default Settingindex;

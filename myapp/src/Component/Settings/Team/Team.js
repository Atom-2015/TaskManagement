import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { MdDesignServices } from "react-icons/md";

const Team = ({ isModalOpen, closeModal }) => {
  
  // Some dummy data for employees
  const employees = [
    {
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      contact: '+91 98765 43210',
      designation: 'Software Engineer',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      contact: '+91 87654 32109',
      designation: 'Product Manager',
    },
    {
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      contact: '+91 99876 54321',
      designation: 'UI/UX Designer',
    },
  ];

  return (
    <div>
    {/* Header row with icons */}
    <div className="grid grid-cols-4 text-white p-3 font-bold bg-slate-500 mt-3 rounded-md">
      <div className="flex justify-center space-x-2">
        <div>Employee Name</div>
        <span className="flex justify-center"><FaRegUserCircle size={20} /></span>
      </div>
  
      <div className="flex justify-center space-x-2">
        <div>Email</div>
        <span className="flex items-center"><HiOutlineMail size={20} /></span>
      </div>
  
      <div className="flex justify-center space-x-2">
        <div>Contact</div>
        <span className="flex items-center"><MdContactPhone size={20} /></span>
      </div>
  
      <div className="flex justify-center space-x-2">
        <div>Designation</div>
        <span className="flex items-center"><MdDesignServices size={20} /></span>
      </div>
    </div>
  
    {/* Employee data rows */}
    {employees.map((employee, index) => (
      <div
        key={index}
        className="grid grid-cols-4 text-black p-2 bg-white mt-2 rounded-md"
      >
        <div className="font-semibold">{employee.name}</div>
        <div>{employee.email}</div>
        <div>{employee.contact}</div>
        <div>{employee.designation}</div>
      </div>
    ))}
  </div>
  );
};

export default Team;

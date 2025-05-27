import React from 'react';
import { FiEye, FiMoreVertical } from 'react-icons/fi';

const payrollData = [
  {
    id: 'PYRL120124',
    name: 'Hazel Nutt',
    role: 'UI/UX Designer',
    level: 'Lead',
    time: '21 Jun, 2024 - 05.05 pm',
    salary: 2500,
    reimbursement: 500,
    status: 'Completed',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 'PYRL120124',
    name: 'Simon Cyrene',
    role: 'UI/UX Designer',
    level: 'Sr',
    time: '21 Jun, 2024 - 05.03 pm',
    salary: 2300,
    reimbursement: 100,
    status: 'Completed',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: 'PYRL120124',
    name: 'Aida Bugg',
    role: 'Graphics Designer',
    level: 'Jr',
    time: '21 Jun, 2024 - 05.01 pm',
    salary: 2000,
    reimbursement: 1000,
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 'PYRL120124',
    name: 'Peg Legge',
    role: 'Animator',
    level: 'Jr',
    time: '21 Jun, 2024 - 05.00 pm',
    salary: 2100,
    reimbursement: 500,
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
  {
    id: 'PYRL120124',
    name: 'Simon Cyrene',
    role: 'UI/UX Designer',
    level: 'Sr',
    time: '21 Jun, 2024 - 05.03 pm',
    salary: 2300,
    reimbursement: 100,
    status: 'Completed',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
];

const PayrollTable = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payroll list</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Employee"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/3"
        />
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>All Status</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>All Role</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              
              <th className="px-4 py-2">Payroll ID</th>
              <th className="px-4 py-2">Employee name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Total Salary</th>
              <th className="px-4 py-2">Reimbursement</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((emp, index) => (
              <tr key={index} className="border-t">
                
                <td className="px-4 py-3 text-gray-800">{emp.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" />
                  <span className="text-gray-700">{emp.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="text-gray-400 mr-1">{emp.level}</span> {emp.role}
                </td>
                <td className="px-4 py-3 text-gray-700">{emp.time}</td>
                <td className="px-4 py-3 text-gray-700">${emp.salary.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-700">${emp.reimbursement.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      emp.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <FiEye className="text-gray-500 cursor-pointer" />
                  <FiMoreVertical className="text-gray-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollTable;

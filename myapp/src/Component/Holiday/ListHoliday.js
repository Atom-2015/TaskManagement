import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import ApplyHoliday from "./ApplyHoliday";

const ListHoliday = () => {
  const [open, setOpen] = useState(false);

  const handleOpenHoliday = () => {
    setOpen(!open);
  };
  // Dummy holiday data
  const holidays = [
    { id: 1, name: "New Year", date: "2025-01-01" },
    { id: 2, name: "Republic Day", date: "2025-01-26" },
    { id: 3, name: "Holi", date: "2025-03-14" },
    { id: 4, name: "Good Friday", date: "2025-04-18" },
    { id: 5, name: "Eid al-Fitr", date: "2025-04-30" },
    { id: 6, name: "Independence Day", date: "2025-08-15" },
    { id: 7, name: "Raksha Bandhan", date: "2025-08-19" },
    { id: 8, name: "Gandhi Jayanti", date: "2025-10-02" },
    { id: 9, name: "Diwali", date: "2025-10-21" },
    { id: 10, name: "Christmas", date: "2025-12-25" },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Holiday List
        </h2>

        <h2
          onClick={ handleOpenHoliday}
          className="text-2xl w-8 h-8 flex items-center justify-center  cursor-pointer hover:animate-spin text-green-600"
        >
          <IoMdAddCircle />
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm border border-gray-200">
          <thead className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-gray-700 text-xs font-bold uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left w-12 border-r border-gray-300">
                #
              </th>
              <th className="px-4 py-3 text-left border-r border-gray-300">
                Holiday Name
              </th>
              <th className="px-4 py-3 text-left w-44 border-r border-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left w-32">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 bg-white divide-y divide-gray-100">
            {holidays.map((holiday, index) => (
              <tr
                key={holiday.id}
                className="hover:bg-indigo-50 transition-all duration-150"
              >
                <td className="px-4 py-3 text-center text-gray-600 font-semibold">
                  {index + 1}
                </td>
                <td className="px-4 py-3  text-left">{holiday.name}</td>
                <td className="px-4 py-3 text-left">{holiday.date}</td>
                <td className="px-4 py-3 text-left">
                  <div className="flex justify-center items-left gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-xl w-full relative">
            <button
              onClick={handleOpenHoliday}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
              title="Close"
            >
              ×
            </button>
            <ApplyHoliday />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHoliday;

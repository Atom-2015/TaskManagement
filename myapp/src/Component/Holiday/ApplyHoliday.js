import React, { useState } from "react";
import { MdHolidayVillage } from "react-icons/md";

const ApplyHoliday = () => {
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!holidayName || !holidayDate) {
      alert("Please fill out both fields.");
      return;
    }

   
    console.log("Holiday Added:", { holidayName, holidayDate });

    // Reset form
    setHolidayName("");
    setHolidayDate("");
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MdHolidayVillage className="text-4xl text-red-500" />
        <h2 className="text-2xl font-bold text-gray-700">Add New Holiday</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Holiday Name</label>
          <input
            type="text"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            placeholder="e.g. Diwali"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Date</label>
          <input
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Add Holiday
        </button>
      </form>
    </div>
  );
};

export default ApplyHoliday;

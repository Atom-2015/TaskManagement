import React from "react";
import { MdHolidayVillage } from "react-icons/md";
import ListHoliday from "./ListHoliday";

const HolidayDashBoard = () => {
  return (
    <div className="h-[90vh] bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="mb-1 flex flex-row items-center justify-center text-center gap-2">
        <MdHolidayVillage className="text-5xl text-red-500 animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-400 animate-pulse ">
          Holiday Dashboard
        </h2>
      </div>
      <hr className="border-t border-gray-500 mb-6 w-full" />

        <div>
            <ListHoliday/>
        </div>


      
    </div>
  );
};

export default HolidayDashBoard;

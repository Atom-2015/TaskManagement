import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";

const WorkStatus = () => {
  return (
    <div className="flex flex-row justify-center mt-4 gap-2">
        <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-red-400 shadow-md rounded-lg px-4 py-2 w-30">
            <FaCircle className="text-red-500 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">Overdue</span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>

      <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-green-500 shadow-md rounded-lg px-4 py-2 w-30">
            <FaRegCircle className="text-green-500 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">Pending</span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>

      <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-orange-400 shadow-md rounded-lg px-4 py-2 w-30">
            <MdOutlineIncompleteCircle className="text-orange-400 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">In Progress</span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>

      <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-green-400 shadow-md rounded-lg px-4 py-2 w-30">
            <MdCheckCircle className="text-green-500 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">Completed</span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>

      <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-green-400 shadow-md rounded-lg px-4 py-2 w-30">
            <MdAccessTimeFilled className="text-green-500 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">In Time</span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>
      <div>
         <div className="flex items-center gap-2 bg-gray-500 border-l-2 border-b-2 border-green-400 shadow-md rounded-lg px-4 py-2 w-30">
            <MdAccessTimeFilled className="text-green-500 text-lg"  size={20}/> {/* Increased size to text-lg */}
            <div className="flex flex-col items-center">
            <span className="text-white text-sm">Delayed  </span>
            <span className="text-white text-xl font-bold">0</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorkStatus;
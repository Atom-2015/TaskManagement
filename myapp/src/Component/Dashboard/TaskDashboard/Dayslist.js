import React, { useState } from 'react';
import { IoMdCheckmark } from "react-icons/io";

const Dayslist = () => {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <div>
      <div className='flex flex-row justify-center p-2 gap-3'>
        {/* Today */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'Today' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('Today')}
        >
          Today
        </div>

        {/* Yesterday */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'Yesterday' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('Yesterday')}
        >
          Yesterday
        </div>

        {/* This Week */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'This Week' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('This Week')}
        >
          This Week
        </div>

        {/* Last Week */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'Last Week' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('Last Week')}
        >
          Last Week
        </div>

        {/* This Month */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'This Month' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('This Month')}
        >
          This Month
        </div>

        {/* Last Month */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'Last Month' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('Last Month')}
        >
          Last Month
        </div>

        {/* This Year */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'This Year' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('This Year')}
        >
          This Year
        </div>

        {/* All Time */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'All Time' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('All Time')}
        >
          All Time
        </div>

        {/* Custom */}
        <div
          className={`border-none rounded-3xl px-3 py-1 hover:cursor-pointer ${
            activeTab === 'Custom' ? 'bg-red-800 text-white' : 'bg-slate-400'
          }`}
          onClick={() => setActiveTab('Custom')}
        >
          Custom
        </div>
      </div>
    </div>
  );
};

export default Dayslist;
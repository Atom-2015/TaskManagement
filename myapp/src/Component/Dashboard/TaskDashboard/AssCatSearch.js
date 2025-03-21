import React, { useState } from 'react';
import { MdFormatClear } from "react-icons/md";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AssCatSearch = () => {
    const [assignedTo,setAssignedTo]=useState('');
    const [category,setCategory]=useState('');
    const [periodically,setPeriodically]=useState('');
    const [search,setSearch]=useState('');

    const handleClear=()=>{
        setAssignedTo('');
        setCategory('');
        setPeriodically('');
        setSearch('');
    }

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-row justify-center space-x-4">
          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
            <select value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
              <option value="" className="text-gray-700"> Assignee To</option>
              <option value="user1" className="text-gray-700">User 1</option>
              <option value="user2" className="text-gray-700">User 2</option>
              <option value="user3" className="text-gray-700">User 3</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select value={category}  onChange={(e)=>setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
              <option value="" className="text-gray-700">Select Category</option>
              <option value="category1" className="text-gray-700">Category 1</option>
              <option value="category2" className="text-gray-700">Category 2</option>
              <option value="category3" className="text-gray-700">Category 3</option>
            </select>
          </div>

          {/* Periodically */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Periodically</label>
            <select value={periodically} onChange={(e)=>setPeriodically(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
              <option value="" className="text-gray-700">Select Period</option>
              <option value="daily" className="text-gray-700">Daily</option>
              <option value="weekly" className="text-gray-700">Weekly</option>
              <option value="monthly" className="text-gray-700">Monthly</option>
            </select>
          </div>

          {/* Search Input and Clear Button */}
          <div className="flex items-end space-x-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Search...</label>
              <input
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>


           

            {/* Clear Button */}
            <div>
              <button onClick={handleClear} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <div className='flex flex-row'> <span className='content-center'>{<MdFormatClear size={22}/> }</span>Clear</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssCatSearch;
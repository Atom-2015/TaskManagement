import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMonthSalary } from '../../FeatureRedux/AttendenceSlice/GetMonthlyUserSlice';
import moment from 'moment';
import { useDateFilter } from '../UseContextHook/MonthYearFilter';

const AttendenceList = () => {
  const dispatch = useDispatch();
  


  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const { isLoading, isError, data: attendanceData, errorMessage } = useSelector(
    (state) => state.GetMonthSalary
  );

  // 🔁 Fetch attendance when month or year changes
  useEffect(() => {
    dispatch(GetMonthSalary({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  // 📅 Generate month and year options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

  return (
    <div className="p-6 border border-gray-700 rounded-xl shadow-md bg-white">
      <div className='flex flex-row justify-between'>
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
        My Monthly Attendance Record
      </h2>

      {/* Month/Year Select */}
      <div className="flex justify-center gap-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {months.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500">{errorMessage}</div>
      ) : !attendanceData || attendanceData.length === 0 ? (
        <div className="text-center text-gray-500">No attendance records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border">
            <thead className="bg-blue-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-2 text-center">#</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Punch In</th>
                <th className="px-4 py-2 text-center">Punch Out</th>
                <th className="px-4 py-2 text-center">Overtime</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {attendanceData.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-all"
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">
                    {moment(item.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-4 py-2 text-center">{item.status || "--"}</td>
                  <td className="px-4 py-2 text-center">{item.check_in_time || "--"}</td>
                  <td className="px-4 py-2 text-center">{item.check_out_time || "--"}</td>
                  <td className="px-4 py-2 text-center">{item.overtime || "0h 0m"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendenceList;

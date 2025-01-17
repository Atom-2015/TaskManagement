import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

// Dummy attendance data (Replace with API call)
const users = ["John Doe", "Jane Smith", "Alice Brown", "Michael Scott"];

// Function to generate attendance data dynamically based on the month
const generateAttendanceData = (daysInMonth) => {
  return users.map((user) => ({
    name: user,
    attendance: Array.from({ length: daysInMonth }, () =>
      Math.random() > 0.2 ? "✔️" : "❌"
    ),
  }));
};

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "present", "absent"

  // Function to update the days in the month when the selected month changes
  useEffect(() => {
    const newDaysInMonth = eachDayOfInterval({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    });

    setDaysInMonth(newDaysInMonth);
    setAttendanceData(generateAttendanceData(newDaysInMonth.length));
  }, [selectedMonth]);

  // Handle Month Change
  const handleMonthChange = (event) => {
    const newMonth = new Date(event.target.value);
    setSelectedMonth(newMonth);
  };

  // Handle Status Filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="p-5">
      {/* Filter Section */}
      <div className="flex gap-5 mb-5">
        {/* Month Selector */}
        <FormControl variant="outlined" className="w-48">
          <InputLabel>Month</InputLabel>
          <Select
            value={format(selectedMonth, "yyyy-MM")}
            onChange={handleMonthChange}
            label="Month"
          >
            {[...Array(12).keys()].map((month) => {
              const date = new Date(new Date().getFullYear(), month, 1);
              return (
                <MenuItem key={month} value={format(date, "yyyy-MM")}>
                  {format(date, "MMMM yyyy")}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl variant="outlined" className="w-48">
          <InputLabel>Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Attendance Table with Scrollbars */}
      <div className="overflow-x-auto max-w-full">
        <div className="overflow-y-auto max-h-[70vh]">
          <table className="min-w-[1000px] table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="font-bold bg-gray-100 p-2">User</th>
                {daysInMonth.map((day, index) => (
                  <th key={index} className="font-bold bg-gray-100 p-2">
                    {format(day, "d")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((user) => (
                <tr key={user.name}>
                  <td className="border p-2">{user.name}</td>
                  {user.attendance.map((status, index) => {
                    if (filter === "present" && status !== "✔️") return null;
                    if (filter === "absent" && status !== "❌") return null;
                    return (
                      <td
                        key={index}
                        className={`border p-2 ${
                          status === "✔️" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {status}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

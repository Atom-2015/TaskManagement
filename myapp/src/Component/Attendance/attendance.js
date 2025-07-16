import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const users = ["John Doe", "Jane Smith", "Alice Brown", "Michael Scott"];

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
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const newDaysInMonth = eachDayOfInterval({
      start: startOfMonth(selectedMonth),
      end: endOfMonth(selectedMonth),
    });
    setDaysInMonth(newDaysInMonth);
    setAttendanceData(generateAttendanceData(newDaysInMonth.length));
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(new Date(event.target.value));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="p-6 bg-[#2e3e4e] min-h-screen">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-5 mb-6">
        {/* Month Selector */}
        <FormControl variant="outlined" className="w-48 ">
          <InputLabel className="text-white">Month</InputLabel>
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
        <FormControl variant="outlined" className="w-48 ">
          <InputLabel className="text-white">Status</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Status">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Attendance Table */}
      <div className="bg-[#2e3e4e] p-2 rounded-lg shadow-[0px_0px_1px_1px_white]  w-full">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full table-fixed border-collapse">
            <thead className="sticky top-0 bg-gray-200 shadow-md rounded">
              <tr className="">
                <th className="p-3 text-left w-40">User</th>
                {daysInMonth.map((day, index) => (
                  <th key={index} className="p-3 text-center w-8">
                    {format(day, "d")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((user) => (
                <tr key={user.name} className="border-t">
                  <td className="p-3 font-medium text-white">{user.name}</td>
                  {user.attendance.map((status, index) => {
                    if (filter === "present" && status !== "✔️") return null;
                    if (filter === "absent" && status !== "❌") return null;
                    return (
                      <td key={index} className="p-2 text-center">
                        {status === "✔️" ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-green-500 text-lg"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="text-red-500 text-lg"
                          />
                        )}
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

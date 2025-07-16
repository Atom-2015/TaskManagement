import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment"
import { GetTodayAttendance } from "../../FeatureRedux/AttendenceSlice/GetTodayUserAttend";
import { getShift } from "../../FeatureRedux/ShiftingSlice/getShiftSlice";
import { GetReportAttendence } from "../../FeatureRedux/AttendenceSlice/GetReportAttendence";
import { useDateFilter } from "../UseContextHook/MonthYearFilter";

const users = [
  { name: "Alice Johnson", role: "Developer", totalDays: 30, presentDays: 30 },
  { name: "Bob Smith", role: "Designer", totalDays: 30, presentDays: 28 },
  { name: "Charlie Lee", role: "Tester", totalDays: 30, presentDays: 30 },
  { name: "David Kumar", role: "Manager", totalDays: 30, presentDays: 25 },
];

// Compute absent days & attendance % and sort
const processedUsers = users
  .map((user) => {
    const absent = user.totalDays - user.presentDays;
    const percentage = Math.round((user.presentDays / user.totalDays) * 100);
    return {
      ...user,
      absentDays: absent,
      percentage,
    };
  })
  .sort((a, b) => b.percentage - a.percentage); // highest attendance first

const CompanyAttendenceList = () => {
  const { month, year, setMonth, setYear } = useDateFilter();

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(GetReportAttendence({month,year}))
    .then((response)=>{
      console.log("Attendance Report Fetcherd:",response.payload.data);
    })
    .catch((error) => {
      console.error("Error fetching attendance:", error);
    });
  },[dispatch,month,year])


  return (
    <div className="bg-white p-2 w-full rounded-xl shadow border border-gray-300  mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-3">
        Company User Attendance Report
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Designation</th>
              <th className="px-4 py-2 text-center">Present</th>
              <th className="px-4 py-2 text-center">Absent</th>
              <th className="px-4 py-2 text-center">Attendance %</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {processedUsers.map((user, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.presentDays}</td>
                <td className="px-4 py-2">{user.absentDays}</td>
                <td className="px-4 py-2">{user.percentage}%</td>
                <td className="px-4 py-2">
                  {user.percentage === 100 ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      🎯 100% Attendance
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyAttendenceList;

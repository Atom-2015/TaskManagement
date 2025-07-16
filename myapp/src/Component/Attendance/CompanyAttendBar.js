import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaDoorOpen,
  FaUserTimes,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetEmployeeTotal } from "../../FeatureRedux/AttendenceSlice/CreateTotalEmployeeSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeStatusModal = lazy(() => import("./EmployeeStatusModal"));

const CompanyAttendBar = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("today"); // 'today', 'date', or 'month'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, isLoading, isError, isSuccess, errorMessage } = useSelector(
    (state) => state.GetEmployeeTotal
  );

  const handleCardClick = (key, title) => {
    if (!key) return;
    setSelectedStatus({ key, title });
  };

  const closeModal = () => setSelectedStatus(null);

  useEffect(() => {
    const params = {};
    
    if (dateFilterType === "today") {
      // No params needed, backend will default to today
    } else if (dateFilterType === "date") {
      params.date = selectedDate.toISOString().split('T')[0];
    } else if (dateFilterType === "month") {
      params.month = month;
      params.year = year;
    }
    
    dispatch(GetEmployeeTotal(params));
  }, [dispatch, dateFilterType, selectedDate, month, year]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const stats = [
    {
      key: null,
      title: "TOTAL EMPLOYEE",
      value: data?.totalEmployees || 0,
      icon: <FaUserGraduate className="text-2xl text-gray-700" />,
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
    },
    {
      key: "present",
      title: "PRESENT TODAY",
      value: data?.counts?.present || 0,
      icon: <FaDoorOpen className="text-2xl text-gray-700" />,
      bgColor: "bg-green-50",
      textColor: "text-green-800",
    },
    {
      key: "absent",
      title: "ABSENT TODAY",
      value: data?.counts?.absent || 0,
      icon: <FaUserTimes className="text-2xl text-gray-700" />,
      bgColor: "bg-red-50",
      textColor: "text-red-800",
    },
    {
      key: "late",
      title: "LATE TODAY",
      value: data?.counts?.late || 0,
      icon: <FaClock className="text-2xl text-gray-700" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
    },
  ];

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-gray-500" />
          <h3 className="font-medium text-gray-700">Filter Attendance</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="today"
              name="filterType"
              checked={dateFilterType === "today"}
              onChange={() => setDateFilterType("today")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="today" className="text-sm text-gray-700">Today</label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="specificDate"
              name="filterType"
              checked={dateFilterType === "date"}
              onChange={() => setDateFilterType("date")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="specificDate" className="text-sm text-gray-700">Specific Date</label>
            {dateFilterType === "date" && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={new Date()}
                className="border rounded px-3 py-1 text-sm w-36"
                dateFormat="yyyy-MM-dd"
              />
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="monthYear"
              name="filterType"
              checked={dateFilterType === "month"}
              onChange={() => setDateFilterType("month")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="monthYear" className="text-sm text-gray-700">Month/Year</label>
            {dateFilterType === "month" && (
              <div className="flex gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {new Date(0, m - 1).toLocaleString("default", { month: "short" })}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display the current filter info */}
      <div className="mb-4 px-4 py-2 bg-blue-50 rounded-lg">
        {dateFilterType === "today" && (
          <p className="text-sm text-blue-700">Showing attendance for: <span className="font-medium">Today ({new Date().toLocaleDateString()})</span></p>
        )}
        {dateFilterType === "date" && (
          <p className="text-sm text-blue-700">Showing attendance for: <span className="font-medium">{selectedDate.toLocaleDateString()}</span></p>
        )}
        {dateFilterType === "month" && (
          <p className="text-sm text-blue-700">Showing attendance for: <span className="font-medium">{new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</span></p>
        )}
      </div>

      {/* 📊 Attendance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl border border-gray-200 shadow-sm ${stat.bgColor} hover:scale-105 transition-transform cursor-pointer`}
            onClick={() => handleCardClick(stat.key, stat.title)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-white shadow-sm">{stat.icon}</div>
                <div className={`flex flex-col ${stat.textColor}`}>
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-sm">{stat.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 👤 Modal for employee list */}
      {selectedStatus && (
        <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
          <EmployeeStatusModal
            title={selectedStatus.title}
            data={data?.employees?.[selectedStatus.key] || []}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </div>
  );
};

export default CompanyAttendBar;
import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import {
  FaUserGraduate,
  FaDoorOpen,
  FaUserTimes,
  FaClock,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetEmployeeTotal } from "../../FeatureRedux/AttendenceSlice/CreateTotalEmployeeSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import ShiftDashBoard from "./ShiftDashBoard";

const EmployeeStatusModal = lazy(() => import("./EmployeeStatusModal"));

const CompanyAttendBar = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("today");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showShiftDashBoard, setShowShiftDashBoard] = useState(false);

  const shiftRef = useRef();

  const { data } = useSelector((state) => state.GetEmployeeTotal);

  const handleCardClick = (key, title) => {
    if (!key) return;
    setSelectedStatus({ key, title });
  };

  const handleOpenit = () => setShowShiftDashBoard(true);
  const handleCloseDashboard = () => setShowShiftDashBoard(false);
  const closeModal = () => setSelectedStatus(null);

  useEffect(() => {
    const params = {};
    if (dateFilterType === "date") {
      params.date = selectedDate.toISOString().split("T")[0];
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

  const cardVariants = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  // Close dashboard if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shiftRef.current && !shiftRef.current.contains(e.target)) {
        handleCloseDashboard();
      }
    };
    if (showShiftDashBoard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShiftDashBoard]);

  return (
    <div className="p-4">
      {/* Header and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow"
      >
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-gray-500" />
          <h3 className="font-medium text-gray-700">Filter Attendance</h3>
          <button
            className="py-1 px-3 text-white bg-slate-700 hover:bg-slate-600 rounded-lg hover:shadow"
            onClick={handleOpenit}
          >
            Open Shift Dashboard
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Today */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={dateFilterType === "today"}
              onChange={() => setDateFilterType("today")}
            />
            Today
          </label>

          {/* Specific Date */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={dateFilterType === "date"}
              onChange={() => setDateFilterType("date")}
            />
            Date
            {dateFilterType === "date" && (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={new Date()}
                className="border rounded px-3 py-1 text-sm w-36"
                dateFormat="yyyy-MM-dd"
              />
            )}
          </label>

          {/* Month */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              checked={dateFilterType === "month"}
              onChange={() => setDateFilterType("month")}
            />
            Month/Year
            {dateFilterType === "month" && (
              <div className="flex gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {new Date(0, m - 1).toLocaleString("default", {
                        month: "short",
                      })}
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
          </label>
        </div>
      </motion.div>

      {/* Filter Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 px-4 py-2 bg-blue-50 rounded-lg"
      >
        {dateFilterType === "today" && (
          <p className="text-sm text-blue-700">
            Showing attendance for:{" "}
            <span className="font-medium">
              Today ({new Date().toLocaleDateString()})
            </span>
          </p>
        )}
        {dateFilterType === "date" && (
          <p className="text-sm text-blue-700">
            Showing attendance for:{" "}
            <span className="font-medium">
              {selectedDate.toLocaleDateString()}
            </span>
          </p>
        )}
        {dateFilterType === "month" && (
          <p className="text-sm text-blue-700">
            Showing attendance for:{" "}
            <span className="font-medium">
              {new Date(year, month - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {year}
            </span>
          </p>
        )}
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`rounded-xl border border-gray-200 shadow-sm ${stat.bgColor} cursor-pointer`}
            onClick={() => handleCardClick(stat.key, stat.title)}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {stat.icon}
                </div>
                <div className={`flex flex-col ${stat.textColor}`}>
                  <span className="text-xl font-bold">{stat.value}</span>
                  <span className="text-sm">{stat.title}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 👥 Shift Dashboard as modal overlay */}
      <AnimatePresence>
        {showShiftDashBoard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: -30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={shiftRef}
              className="bg-white rounded-xl shadow-xl p-4 w-full max-w-4xl relative"
            >
              <button
                onClick={handleCloseDashboard}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              >
                <FaTimes size={20} />
              </button>
              <ShiftDashBoard />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Employee Modal */}
      <AnimatePresence>
        {selectedStatus && (
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <EmployeeStatusModal
              title={selectedStatus.title}
              data={data?.employees?.[selectedStatus.key] || []}
              onClose={closeModal}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyAttendBar;

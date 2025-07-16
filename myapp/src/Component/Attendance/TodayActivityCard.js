import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getYear,
  getMonth,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { GetSummaryUser } from "../../FeatureRedux/AttendenceSlice/GetSummaryAttendUserSlice";
import AttendenceList from "./AttendenceList";

// 🎨 Status to color map
const getStatusColor = (status) => {
  switch (status) {
    case "Present":
      return "bg-green-500 text-white";
    case "Absent":
      return "bg-red-500 text-white";
    case "Holiday":
      return "bg-blue-500 text-white";
    case "Half Day":
      return "bg-yellow-400 text-black";
    case "Late":
      return "bg-orange-400 text-white";
    case "Upcoming":
      return "bg-gray-300 text-black";
    case "Pending":
      return "bg-purple-400 text-white";
    case "Weekend":
      return "bg-blue-400 text-white";
    default:
      return "bg-gray-100 text-black";
  }
};

// 📌 Status to icon map
const getStatusIcon = (status) => {
  switch (status) {
    case "Present":
      return "✓";
    case "Absent":
      return "✗";
    case "Holiday":
      return "✈";
    // case "Weekend": return "✈";
    case "Half Day":
      return "½";
    case "Late":
      return "⏰";
    case "Upcoming":
      return "📅";
    case "Pending":
      return "⏳";

    default:
      return "";
  }
};

const AttendanceCalendar = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearSelect, setShowYearSelect] = useState(false);

  const { getData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.GetSummarySlice
  );

  const summaryArray = getData?.summary || [];
  const weeklyOffDays = getData?.holidayData?.weeklyOff || ["Sunday"];

  // 🔁 Convert summary to map for quick lookup
  const attendanceMap = summaryArray.reduce((acc, item) => {
    const dateObj =
      typeof item.date === "string" ? parseISO(item.date) : new Date(item.date);
    const dateStr = format(dateObj, "yyyy-MM-dd");
    acc[dateStr] = item;
    return acc;
  }, {});

  // 🧠 Fetch attendance on currentDate change
  useEffect(() => {
    const year = getYear(currentDate);
    const month = getMonth(currentDate) + 1;
    dispatch(GetSummaryUser({ month, year }));
  }, [dispatch, currentDate]);

  // 📆 Calendar range
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const daysInCalendar = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // 📅 Month/year navigation
  const changeMonth = (next) => {
    setCurrentDate(
      next ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
    );
  };

  const changeYear = (year) => {
    setCurrentDate(new Date(year, getMonth(currentDate), 1));
    setShowYearSelect(false);
  };

  const currentYear = getYear(new Date());
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 5 + i);

  const isWeekendDay = (day) => {
    const dayName = format(day, "EEEE");
    return weeklyOffDays.includes(dayName);
  };

  return (
    <div className="w-full max-w-md border border-gray-300 p-4 rounded-2xl shadow-md bg-white">
      {/* 🟦 Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(false)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &lt;
        </button>

        <div className="flex items-center gap-2 relative">
          <h2
            className="text-blue-600 text-lg font-semibold cursor-pointer"
            onClick={() => setShowYearSelect(!showYearSelect)}
          >
            {format(currentDate, "MMMM yyyy")}
          </h2>

          {showYearSelect && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg z-10 p-2 max-h-40 overflow-y-auto">
              {years.map((year) => (
                <div
                  key={year}
                  className={`p-1 px-3 cursor-pointer hover:bg-gray-100 rounded ${
                    getYear(currentDate) === year ? "bg-blue-100" : ""
                  }`}
                  onClick={() => changeYear(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => changeMonth(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>

      {/* 🟨 Loader/Error */}
      {isLoading && (
        <p className="text-center text-gray-600">Loading attendance...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Error: {errorMessage}</p>
      )}

      {/* ✅ Calendar Grid */}
      {!isLoading && !isError && (
        <>
          {/* 📆 Weekday Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 📅 Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {daysInCalendar.map((day, index) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const record = attendanceMap[dateStr];

              let status = record?.status
                ? record.status
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                : isWeekendDay(day)
                ? "Weekend"
                : undefined;

              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());

              const tooltip =
                record?.check_in_time || record?.check_out_time
                  ? `In: ${record?.check_in_time || "-"} | Out: ${
                      record?.check_out_time || "-"
                    }`
                  : status || "";

              return (
                <div
                  key={index}
                  title={tooltip}
                  className={`h-12 flex flex-col items-center justify-center rounded-md text-sm
                    ${getStatusColor(status)}
                    ${!isCurrentMonth ? "opacity-40" : ""}
                    ${isToday ? "ring-2 ring-black" : ""}
                    border border-gray-300`}
                >
                  <div className="text-xs font-medium">{format(day, "d")}</div>
                  <div className="text-xs">{getStatusIcon(status)}</div>
                </div>
              );
            })}
          </div>

          {/* 🟩 Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            {[
              "Present",
              "Absent",
              "Holiday",
              "Weekend",
              "Half Day",
              "Late",
              "Upcoming",
              "Pending",
            ].map((status) => (
              <div key={status} className="flex items-center gap-1">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${getStatusColor(
                    status
                  )}`}
                ></span>
                {status}
              </div>
            ))}
          </div>

          {/* 📊 Summary Count */}
          {getData?.counts && (
            <div className="mt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {Object.entries(getData.counts).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-1 rounded-md border ${getStatusColor(
                      key
                    )} shadow-sm`}
                  >
                    <span className="font-medium">{key}</span>
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceCalendar;

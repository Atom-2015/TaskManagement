import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticsUser } from "../../FeatureRedux/AttendenceSlice/GetStaticsUserWorkSlice";

const formatHHMM = (timeStr) => {
  const decimal = parseFloat(timeStr || "0");
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const getDecimalTime = (timeStr) => {
  return parseFloat(timeStr || "0");
};

const ProgressBar = ({ label, value, total, color, rawValue, rawTotal }) => {
  const percentage = Math.min((rawValue / rawTotal) * 100, 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
        <span>{label}</span>
        <span>
          {formatHHMM(value)} / {formatHHMM(total)}
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className={`${color} h-2 transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const StaticsCard = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, data, errorMessage } = useSelector(
    (state) => state.GetStaticsUser
  );

  useEffect(() => {
    dispatch(GetStaticsUser());
    const interval = setInterval(() => {
      dispatch(GetStaticsUser());
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const stats = data?.statistics
    ? [
        {
          label: "Today",
          value: data.statistics.today.split(" / ")[0],
          total: data.statistics.today.split(" / ")[1],
          color: "bg-green-400",
        },
        {
          label: "This Week",
          value: data.statistics.thisWeek.split(" / ")[0],
          total: data.statistics.thisWeek.split(" / ")[1],
          color: "bg-blue-400",
        },
        {
          label: "This Month",
          value: data.statistics.thisMonth.split(" / ")[0],
          total: data.statistics.thisMonth.split(" / ")[1],
          color: "bg-orange-400",
        },
        {
          label: "Remaining",
          value: data.statistics.remaining.split(" / ")[0],
          total: data.statistics.remaining.split(" / ")[1],
          color: "bg-red-400",
        },
        {
          label: "Overtime",
          value: data.statistics.overtime.split(" / ")[0],
          total: data.statistics.overtime.split(" / ")[1],
          color: "bg-yellow-400",
        },
      ]
    : [];

  return (
    <div className="w-[30%] border border-gray-400 p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-blue-600 text-lg font-semibold mb-4">Statistics</h2>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500">{errorMessage}</div>
      ) : stats.length === 0 ? (
        <div className="text-center text-gray-500">No data available</div>
      ) : (
        stats.map((item, index) => (
          <ProgressBar
            key={index}
            label={item.label}
            value={item.value}
            total={item.total}
            color={item.color}
            rawValue={getDecimalTime(item.value)}
            rawTotal={getDecimalTime(item.total)}
          />
        ))
      )}
    </div>
  );
};

export default StaticsCard;

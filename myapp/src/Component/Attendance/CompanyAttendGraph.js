import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GetTotalGraph } from "../../FeatureRedux/AttendenceSlice/GetAttendenceGraph";
import { useDateFilter } from "../UseContextHook/MonthYearFilter";
import FilterDropDown from "./FilterDropDown";

const CompanyAttendGraph = () => {
  const dispatch = useDispatch();
  const {month,year}=useDateFilter();

  useEffect(() => {
    // const now = new Date();
    // const month = now.getMonth() + 1;
    // const year = now.getFullYear();
    dispatch(GetTotalGraph({ month, year }));
  }, [dispatch,month,year]);

  const {
    data: graphData,
    isError,
    isLoading,
    errorMessage,
  } = useSelector((state) => state.GetTotalGraph);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  // ✅ Transform and prepare data
  const chartData =
    graphData?.presentPerDay?.map((entry) => ({
      date: formatter.format(new Date(entry.date)), // e.g. "Jul 1"
      value: entry.presentCount,
    })) || [];

  // ✅ Calculate max value dynamically
  const maxValue = Math.max(...chartData.map((d) => d.value), 1); // fallback to 1 if no data

  return (
    <div className="bg-white shadow-md rounded-lg p-2 border border-gray-600">
      
      <div className="flex flex-row justify-between">
      <h2 className="text-lg font-semibold mb-1">Total Attendance Report</h2>
      
      <div><FilterDropDown/></div>
      </div>

      {isLoading ? (
        <p>Loading chart...</p>
      ) : isError ? (
        <p className="text-red-500">Error: {errorMessage}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, maxValue + 2]} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "6px", color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 5, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CompanyAttendGraph;

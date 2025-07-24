import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getCompanyMonthlySalary } from "../../FeatureRedux/PayrollSlice/PayrollCompanyGraphSlice";

const PayrollGraph = () => {
  const dispatch = useDispatch();

  const {
    data: salaryData,
    isLoading,
    isError,
    errorMessage,
  } = useSelector((state) => state.getCompanyMonthlySalary);

  useEffect(() => {
    dispatch(getCompanyMonthlySalary(new Date().getFullYear()));
  }, [dispatch]);

  const chartData = salaryData?.map((item) => ({
    month: item.month,
    salary: item.totalNetPay || 0,
  })) || [];

  return (
    <div className="bg-white h-full w-full p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Total Salary Overview
      </h2>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          {errorMessage || "Failed to load data"}
        </div>
      ) : (
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{
                  fontSize: "0.875rem",
                  borderRadius: "0.5rem",
                  borderColor: "#6366f1",
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Legend
                wrapperStyle={{ fontSize: "0.75rem", marginTop: 10 }}
                verticalAlign="top"
                align="right"
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="salary"
                name="Total Salary"
                stroke="url(#colorSalary)"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: "#4f46e5", fill: "#fff" }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationDuration={1200}
                animationBegin={200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PayrollGraph;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Mar", cost: 3000, expense: 1500 },
  { month: "Apr", cost: 6000, expense: 2000 },
  { month: "May", cost: 9000, expense: 3000 },
  { month: "Jun", cost: 5000, expense: 1800 },
  { month: "Jul", cost: 8700, expense: 2110 },
  { month: "Aug", cost: 4000, expense: 1200 },
  { month: "Sep", cost: 7000, expense: 2600 },
  { month: "Oct", cost: 6200, expense: 2400 },
  { month: "Nov", cost: 9700, expense: 3100 },
];

const PayrollGraph = () => {
  return (
    <div className="bg-white h-full w-full p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Payroll Cost Overview
      </h2>
      <p className="text-sm text-gray-500 mb-4">Monthly cost vs expense</p>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ fontSize: "0.875rem", borderRadius: "0.5rem" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem", paddingTop: 8 }}
              iconType="circle"
            />
            <Bar dataKey="cost" stackId="a" fill="#4f46e5" name="Cost" />
            <Bar dataKey="expense" stackId="a" fill="#818cf8" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PayrollGraph;

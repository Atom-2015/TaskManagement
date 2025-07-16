import React, { useState } from "react";
import DonutChart from "../Donutcharts";
import Myteamtable from "./Myteamtable";

// Circular Progress Component
const CircularProgress = ({ used, total, color }) => {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = total > 0 ? (used / total) * 100 : 0;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#1F2937"
        transform="rotate(90, 24, 24)"
      >
        {String(used).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </text>
    </svg>
  );
};

// Attendance Card
const AttendanceCard = ({ title, present, total, color, textColor }) => {
  const absent = total - present;
  return (
    <div className="border rounded-md shadow-blue-700 p-2 w-44 flex items-center gap-3">
      <CircularProgress used={present} total={total} color={color} />
      <div className="flex flex-col justify-center">
        <h3 className={`text-sm font-semibold ${textColor}`}>{title}</h3>
        <p className="text-xs text-gray-700">
          Present - {String(present).padStart(2, "0")}
        </p>
        <p className="text-xs text-gray-700">
          Absent - {String(absent).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

const Leavemyteam = () => {
  const attendanceData = [
    {
      title: "Today ",
      present: 45,
      total: 50,
      color: "#10B981",
      textColor: "text-green-600",
    },
    {
      title: "This Week",
      present: 220,
      total: 250,
      color: "#3B82F6",
      textColor: "text-blue-600",
    },
    {
      title: "This Month",
      present: 850,
      total: 1000,
      color: "#F59E0B",
      textColor: "text-yellow-600",
    },
    {
      title: "This Year",
      present: 4500,
      total: 5000,
      color: "#EF4444",
      textColor: "text-red-600",
    },
  ];

  const chartLabels = ["Present", "Absent"];
  const todayData = attendanceData.find(item => item.title === "Today ");
  const chartData = [
    todayData.present,
    todayData.total - todayData.present
  ];

  return (
    <div>
      <div className="w-full h-[835px] rounded p-3 bg-white">
        <div>
          <div>
            <div className="flex flex-row justify-center items-start flex-wrap gap-6">
              <div className="flex flex-wrap gap-4">
                {attendanceData.map((item, idx) => (
                  <AttendanceCard key={idx} {...item} />
                ))}
              </div>
              <div className="">
                <DonutChart 
                  labels={chartLabels} 
                  dataValues={chartData} 
                  colors={["#10B981", "#EF4444"]}
                />
              </div>
            </div>
          </div>

          <div>
            <Myteamtable/>
          </div>
        </div>

        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Leavemyteam;
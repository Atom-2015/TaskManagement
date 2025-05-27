import React, { useState } from "react";
import DonutChart from "./Donutcharts";
import LeaveAnnouce from "./LeaveAnnouce";
import LeaveTable from "./LeaveTable";
import LeaveApply from "./LeaveApply";
import { Announcement } from "@mui/icons-material";

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

// Leave Card
const LeaveCard = ({ title, used, total, color, textColor }) => {
  return (
    <div className="border rounded-md shadow-sm p-2 w-44 flex items-center gap-3">
      <CircularProgress used={used} total={total} color={color} />
      <div className="flex flex-col justify-center">
        <h3 className={`text-sm font-semibold ${textColor}`}>{title}</h3>
        <p className="text-xs text-gray-700">
          Available - {String(total - used).padStart(2, "0")}
        </p>
        <p className="text-xs text-gray-700">
          Used - {String(used).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

// Dashboard
const LeaveDashboard = () => {
  const [showApply, setShowApply] = useState(false);
  const [open, setOpen] = useState(false);
  const leaveApplybutton = () => {
    setShowApply((prev) => !prev);
  };

  const AnnouncementButton = () => {
    setOpen((prev) => !prev);
  };

  const leaves = [
    {
      title: "Casual Leave",
      used: 2,
      total: 7,
      color: "#a855f7",
      textColor: "text-purple-600",
    },
    {
      title: "Sick Leave",
      used: 3,
      total: 5,
      color: "#3b82f6",
      textColor: "text-blue-600",
    },

    {
      title: "Unpaid Leave",
      used: 5,
      total: 10,
      color: "#6366f1",
      textColor: "text-indigo-600",
    },
    {
      title: "Half Leave",
      used: 3,
      total: 12,
      color: "#4b5563",
      textColor: "text-gray-600",
    },
  ];

  const chartLabels = leaves.map((leave) => leave.title);
  const chartData = leaves.map((leave) => leave.used);

  return (
    <div className="h-[835px] bg-gray-50 p-6">

     

      <div className=" bg-white  rounded-xl shadow-md p-6">
        <div className=" flex flex-row justify-end">
        
        <h2 className=" text-xl font-bold text-center  uppercase mb-6 text-blue-600">
          Leave Dashboard
        </h2>
        </div>

        <div className="flex flex-row justify-center items-start flex-wrap gap-6">
          <div className="flex flex-wrap gap-4">
            {leaves.map((leave, idx) => (
              <LeaveCard key={idx} {...leave} />
            ))}
          </div>
          <div className="">
            <DonutChart labels={chartLabels} dataValues={chartData} />
          </div>
        </div>
        {/* 
        <div>
          <div className="h-full justify-end mt-4 bg-white">
            <button className= "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={(e)=>AnnouncementButton()}
            >
            Announcement
            </button>
            {open && (
              <LeaveAnnouce/>
            )
            }
          </div>
        </div> */}

        <div>
          <div className="h-full flex justify-end mt-4 bg-white">
            <button
              className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={(e) => leaveApplybutton()}
            >
              Apply Leave
            </button>
            {showApply && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Background overlay */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  onClick={() => setShowApply(false)}
                />

                {/* Centered modal panel */}
                <div className="relative bg-white w-full max-w-lg p-3 rounded-xl shadow-xl z-50 overflow-y-auto max-h-[90vh]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Apply Leave
                    </h2>
                    <button
                      onClick={() => setShowApply(false)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                  <LeaveApply onClose={() => setShowApply(false)} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="">
            <LeaveTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDashboard;

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PayrollCircle = () => {
  const bonuses = 5100;
  const incentives = 5400;
  const total = bonuses + incentives;

  const data = {
    labels: ["Bonuses", "Incentives"],
    datasets: [
      {
        data: [bonuses, incentives],
        backgroundColor: ["#2563eb", "#059669"], // Tailwind blue-600 and green-600
        borderColor: ["#e5e7eb", "#e5e7eb"],     // Light border
        borderWidth: 2,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white h-full w-full p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Bonuses & Incentives
      </h2>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative h-[160px] w-[160px]">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-xl font-bold text-gray-800">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-around border-t pt-4 text-sm">
        <div className="text-center">
          <p className="text-blue-600 font-semibold">
            ₹{bonuses.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Bonuses</p>
        </div>
        <div className="border-l h-6 mx-3"></div>
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            ₹{incentives.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-0.5">Incentives</p>
        </div>
      </div>
    </div>
  );
};

export default PayrollCircle;

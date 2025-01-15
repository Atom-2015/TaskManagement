import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  // Static data for the Donut Chart
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Labels for the segments
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3], // Data values for each label
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Allow custom sizing
    cutout: '70%', // This creates the donut effect by cutting out the center
  };

  return (
    <div className="donut-chart-container mx-auto p-4 bg-[#3d5a80] rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-semibold mb-4">Donut Chart Example</h3>
      <div className="w-64 h-64 mx-auto"> {/* Restrict size using width and height */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default DonutChart;

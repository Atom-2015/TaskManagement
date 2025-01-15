import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function LineChart() {
  // Static data for the Line Chart (simulating an ECG-like curve)
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Same labels as Pie chart
    datasets: [
      {
        label: 'Aditya Bhaiya',  
        data: [12, 19, 3, 5, 2, 3], // Data values for each label
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 2, // Line width
        tension: 0.4, // Smoothing effect for the line (like ECG)
        fill: false, // No fill under the line
        pointRadius: 4, // Points on the line (similar to peaks in ECG)
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        pointBorderColor: 'rgba(75, 192, 192, 1)', // Point border color
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
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Skips some labels for readability
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
      },
    },
    animation: {
      duration: 2000, // Duration of the animation (in ms)
      easing: 'easeOutBounce', // Easing function for smooth animation
      onComplete: () => {
        console.log('Animation Completed!');
      },
    },
  };

  return (
    <div className="line-chart-container mx-auto p-4 bg-[#3d5a80] rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-semibold mb-4">Animated Line Chart  </h3>
      <div className="w-64 h-64 mx-auto"> {/* Restrict size using width and height */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;
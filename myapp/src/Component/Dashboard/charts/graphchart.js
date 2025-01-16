import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function GraphChart() {
  // Static data for the Bar Chart
  const data = {
    labels: ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' ,'Sep' , 'Oct' , 'Nov', 'Dec'], // Same labels as Pie chart
    datasets: [    
      {
        label: '# of Votes', // Label for the dataset
        data: [12, 19, 3, 5, 2, 3], // Data values for each label
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ], // Bar colors
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ], // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          color: '#ffffff', // Set legend label text color to white
        },
       
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // Set X-axis text color to white
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // Set Y-axis text color to white
        },
      },
    },
    maintainAspectRatio: false, // Allow custom sizing
  };

  return (
    <div className="w-[50%] mx-auto p-3 bg-[#354759] rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-semibold text-white mb-4">
        Bar Chart Example
      </h3>
      <div className="w-[100%] h-64 mx-auto"> {/* Restrict size using width and height */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default GraphChart;

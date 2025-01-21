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
    labels: ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' ,'Sep' , 'Oct' , 'Nov', 'Dec'],
    datasets: [
      {
        label: 'User Task', 
        data: [12, 19, 3, 5, 2, 3], // Data values for each label
        borderColor: 'white', // Line color
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
        labels: {
          color: '#ffffff', // Set legend label text color to white
        },
      },
      
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Allow custom sizing
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
    <div className="w-[50%] p-3 bg-[#354759] rounded-lg shadow-lg">
      <div className='flex justify-around align-middle items-center'>
        <div>
        <div class="relative w-64 ">
 
  <select id="dropdown" class=" block  p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-[#354759] text-white">
    <option value="" disabled selected>Choose User</option>
    <option value="option1">Noor</option>
    <option value="option2">Divya</option>
    <option value="option3">Kunal</option>
    <option value="option3">Deepak</option>
    <option value="option3">Kamal</option>
  </select>
</div>
          
          </div>     
      <h3 className="text-center text-white text-lg font-semibold ">User Bar Graph</h3>
      </div>

      <div className="w-full" style={{ height: '270px' }}> {/* Set a specific height here */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;

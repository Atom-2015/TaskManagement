import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ labels, dataValues }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Leaves',
        data: dataValues,
     backgroundColor: [
  '#4F46E5', 
  '#10B981', 
  '#F59E0B', 
  '#EF4444', 
],
    borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex items-center gap-6">
      <div className="w-[100px] h-[100px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="text-sm space-y-2">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span className="text-gray-700">{label}: {dataValues[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;

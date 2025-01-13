import React, { useState, useEffect } from 'react';

function ClockDashboard() {
  const [time, setTime] = useState(new Date());
  const name = "Aditya"; // You can replace this with dynamic user data
  const [greet, setGreet] = useState('');

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Determine the greeting based on the current hour
    const currentHour = time.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreet('Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreet('Afternoon');
    } else {
      setGreet('Evening');
    }

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="flex justify-between items-center h-[120px] w-full p-4 mt-[50px]">
      {/* Greeting Section (left side) */}
      <div className="text-2xl font-semibold text-gray-800">
        Good {greet}, {name}!
      </div>

      {/* Time Section (right side) */}
      <div className="shadow-md rounded-xl p-6 text-center w-[250px] bg-[#619FD0] h-[90px]">
        <h2 className="text-2xl font-semibold text-gray-800">
          {time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </h2>
        <p className="text-sm text-gray-600">
          {time.toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

export default ClockDashboard;

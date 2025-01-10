import React, { useState, useEffect } from 'react';

function ClockDashboard() {
  const [time, setTime] = useState(new Date());
  const name = "Ankit"; // You can replace this with dynamic user data

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center  h-[120px] w-full p-4 mt-[50px] ">
      {/* Greeting Section (left side) */}
      <div className="text-2xl font-semibold text-gray-800  ">
        Good Evening, {name}!
      </div>

      {/* Time Section (right side) */}
      <div className=" shadow-md rounded-xl p-6 text-center w-[250px] bg-[#619FD0] h-[100px] ">
        <h2 className="text-2xl font-semibold text-gray-800">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

import React from 'react';

const GanttChart = ({ duration, startDate, endDate }) => {
  const days = parseInt(duration?.split(' ')[0]) || 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Generate days array
  const daysArray = [];
  const current = new Date(start);
  while (current <= end) {
    daysArray.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const dayWidth = 14; // px per day
  const totalWidth = daysArray.length * dayWidth;

  return (
    <div className="gantt-calendar-view" style={{ 
      width: `${totalWidth}px`,
      minWidth: '100%',
      fontSize: '9px'
    }}>
      {/* Month Header */}
      <div className="flex h-4">
        {daysArray.map((day, i) => {
          const showMonth = i === 0 || day.getMonth() !== daysArray[i-1].getMonth();
          return (
            <div key={`m-${i}`} className="relative" style={{ width: `${dayWidth}px` }}>
              {showMonth && (
                <span className="absolute -top-3 left-0 font-semibold">
                  {day.toLocaleString('default', { month: 'short' })}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Day Numbers */}
      <div className="flex h-4">
        {daysArray.map((day, i) => (
          <div 
            key={`d-${i}`}
            className={`text-center ${[0,6].includes(day.getDay()) ? 'text-gray-400' : ''}`}
            style={{ width: `${dayWidth}px` }}
          >
            {day.getDate()}
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="flex h-2 mt-1">
        {daysArray.map((_, i) => (
          <div
            key={`p-${i}`}
            className={`${i < days ? 'bg-blue-500' : 'bg-gray-200'} border-r border-white`}
            style={{ width: `${dayWidth}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
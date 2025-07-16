import React from "react";

const CompanyGender = () => {
  const malePercent = 35;
  const femalePercent = 65;

  const maleCount = 29;
  const femaleCount = 29;

  const minSize = 50;
  const maxSize = 112;

  const getSize = (percent) =>
    Math.max(minSize, (percent / 100) * maxSize);

  const maleSize = getSize(malePercent);
  const femaleSize = getSize(femalePercent);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm border border-gray-500 min-h-[350px]">
      <h2 className="text-md font-semibold text-gray-700 mb-4">Employee by Gender</h2>

      <div className="relative h-36 flex justify-center items-center">
        {/* Male Circle */}
        <div
          className="absolute z-10 flex items-center justify-center bg-green-500 rounded-full text-white text-lg font-bold"
          style={{
            width: `${maleSize}px`,
            height: `${maleSize}px`,
            left: "5rem",
          }}
        >
          {malePercent}%
        </div>

        {/* Female Circle */}
        <div
          className="absolute z-0 flex items-center justify-center bg-gray-900 rounded-full text-white text-lg font-bold"
          style={{
            width: `${femaleSize}px`,
            height: `${femaleSize}px`,
            left: "7rem",
          }}
        >
          {femalePercent}%
        </div>
      </div>

      {/* Labels */}
      <div className="mt-6 flex justify-around text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-gray-600 font-medium">Male {maleCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-900"></span>
          <span className="text-gray-600 font-medium">Female {femaleCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyGender;

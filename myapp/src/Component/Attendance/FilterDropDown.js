import React from "react";
import { useDateFilter } from "../UseContextHook/MonthYearFilter";

const FilterDropDown = () => {
  const { month, year, setMonth, setYear } = useDateFilter();

  // You can modify this to allow more years if needed
  const yearOptions = Array.from({ length: 10 }, (_, i) => 2020 + i); // From 2000 to 2049

  return (
    <div className="flex gap-2">
      {/* Month dropdown */}
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Year dropdown */}
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {yearOptions.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropDown;

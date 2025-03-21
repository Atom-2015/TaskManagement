import React, { useState, useRef, useEffect } from "react";
import CategoryWise from "./Alldetail/CategoryWise";
import DailyReport from "./Alldetail/DailyReport";
import Delegated from "./Alldetail/Delegated";
import EmployeeWise from "./Alldetail/EmployeeWise";
import MonthlyReport from "./Alldetail/MonthlyReport";
import MyReport from "./Alldetail/MyReport";
import OverdueReport from "./Alldetail/OverdueReport";

const Alldetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: "0px", left: "0px" });
  const navRef = useRef(null);

  const navItems = [
    { id: "Employee Wise", label: "Employee Wise", component: <EmployeeWise /> },
    { id: "Category Wise", label: "Category Wise", component: <CategoryWise /> },
    { id: "My Report", label: "My Report", component: <MyReport /> },
    { id: "Daily Report", label: "Daily Report", component: <DailyReport /> },
    { id: "Delegated", label: "Delegated", component: <Delegated /> },
    { id: "Monthly Report", label: "Monthly Report", component: <MonthlyReport /> },
    { id: "OverDue Report", label: "Overdue Report", component: <OverdueReport /> },
  ];

  const handleLinkClick = (index, event) => {
    setActiveIndex(index);

    if (navRef.current) {
      const linkElement = event.target;
      setIndicatorStyle({
        width: `${linkElement.offsetWidth}px`,
        left: `${linkElement.offsetLeft}px`,
      });
    }
  };

  useEffect(() => {
    // Set initial position for the indicator on first render
    if (navRef.current) {
      const activeElement = navRef.current.children[activeIndex].querySelector("button");
      setIndicatorStyle({
        width: `${activeElement.offsetWidth}px`,
        left: `${activeElement.offsetLeft}px`,
      });
    }
  }, []);

  return (
    <div className="text-white p-2 w-auto relative">
      <div className="container mx-auto flex flex-row justify-center">
        <div className="relative w-full max-w-7xl">
          <ul ref={navRef} className="flex gap-6 justify-center relative border-b-[0.5px] border-green-50">
            {navItems.map((item, index) => (
              <li key={item.id} className="text-center">
                <button
                  onClick={(event) => handleLinkClick(index, event)}
                  className={`p-2 text-gray-100 transition duration-300 ${
                    activeIndex === index ? "font-bold" : ""
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {/* Smooth Sliding Indicator */}
            <div
              className="absolute bottom-0 h-[5px] bg-green-500 transition-all duration-700 ease-in-out"
              style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
              }}
            ></div>
          </ul>
        </div>
      </div>

      {/* Render the corresponding component */}
      <div className="mt-4">{navItems[activeIndex].component}</div>
    </div>
  );
};

export default Alldetail;

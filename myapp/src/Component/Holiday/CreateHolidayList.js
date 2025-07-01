import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddholidayList } from "../../FeatureRedux/HolidaySlice/CreateAllHolidaySlice";
import Swal from "sweetalert2";
import { editHoliday } from "../../FeatureRedux/HolidaySlice/editSingleHolidaySlice";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CreateHolidayList = ({ onClose }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector((state) => state.AddholidayList);

  const [year, setYear] = useState(new Date().getFullYear());
  const [weeklyOff, setWeeklyOff] = useState([]);
  const [holidays, setHolidays] = useState([{ name: "", date: "" }]);
  const [overrides, setOverrides] = useState([{ date: "", isWorkingDay: false, reason: "" }]);

  const handleWeeklyOffChange = (day) => {
    setWeeklyOff((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleHolidayChange = (index, field, value) => {
    const updated = [...holidays];
    updated[index][field] = value;
    setHolidays(updated);
  };

  const addHoliday = () => {
    setHolidays([...holidays, { name: "", date: "" }]);
  };

  const removeHoliday = (index) => {
    if (holidays.length > 1) {
      const updated = [...holidays];
      updated.splice(index, 1);
      setHolidays(updated);
    }
  };

  const handleOverrideChange = (index, field, value) => {
    const updated = [...overrides];
    updated[index][field] = field === "isWorkingDay" ? value === "true" : value;
    setOverrides(updated);
  };

  const addOverride = () => {
    setOverrides([...overrides, { date: "", isWorkingDay: false, reason: "" }]);
  };

  const removeOverride = (index) => {
    if (overrides.length > 1) {
      const updated = [...overrides];
      updated.splice(index, 1);
      setOverrides(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { year, weeklyOff, holidays, overrides };
    setHasSubmitted(true);
    dispatch(AddholidayList(formData));
  };

  useEffect(() => {
    if (isSuccess && hasSubmitted) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Holiday configuration saved successfully.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        setHasSubmitted(false);
        onClose();
      });
    }
  }, [isSuccess, hasSubmitted, onClose]);

  useEffect(() => {
    if (isError && hasSubmitted) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: errorMessage || "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      }).then(() => {
        setHasSubmitted(false);
      });
    }
  }, [isError, hasSubmitted, errorMessage]);

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Holiday Configuration</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Year */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min="2000"
              max="2100"
            />
          </div>

          {/* Weekly Off */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weekly Off Days</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {weekdays.map((day) => (
                <label 
                  key={day} 
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    weeklyOff.includes(day) 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={weeklyOff.includes(day)}
                    onChange={() => handleWeeklyOffChange(day)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Holidays */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Holidays</label>
              <button
                type="button"
                onClick={addHoliday}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Holiday
              </button>
            </div>
            
            <div className="space-y-3">
              {holidays.map((holiday, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      placeholder="Holiday name"
                      value={holiday.name}
                      onChange={(e) => handleHolidayChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <input
                      type="date"
                      value={holiday.date}
                      onChange={(e) => handleHolidayChange(index, "date", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    {holidays.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHoliday(index)}
                        className="w-full py-2 text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overrides */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Special Day Overrides</label>
              <button
                type="button"
                onClick={addOverride}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Override
              </button>
            </div>
            
            <div className="space-y-3">
              {overrides.map((override, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-3">
                    <input
                      type="date"
                      value={override.date}
                      onChange={(e) => handleOverrideChange(index, "date", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <select
                      value={override.isWorkingDay.toString()}
                      onChange={(e) => handleOverrideChange(index, "isWorkingDay", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="true">Working Day</option>
                      <option value="false">Holiday</option>
                    </select>
                  </div>
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      placeholder="Reason"
                      value={override.reason}
                      onChange={(e) => handleOverrideChange(index, "reason", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    {overrides.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOverride(index)}
                        className="w-full py-2 text-red-600 hover:text-red-700 font-medium text-sm flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHolidayList;

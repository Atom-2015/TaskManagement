import React, { useEffect, useState } from "react";
import { MdHolidayVillage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddHolidaycreate } from "../../FeatureRedux/HolidaySlice/AddHolidaySlice";
import { editHoliday } from "../../FeatureRedux/HolidaySlice/editSingleHolidaySlice";
import { getHolidayList } from "../../FeatureRedux/HolidaySlice/GetHolidaySlice";
import Swal from "sweetalert2";

const ApplyHoliday = ({ editData, onClose }) => {
  const dispatch = useDispatch();
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");

  const { isError, errorMessage, isLoading, isSuccess } = useSelector(
    (state) => state.addHoliday
  );

  // Prefill on edit
  useEffect(() => {
    if (editData) {
      setHolidayName(editData.name || "");
      setHolidayDate(editData.date?.substring(0, 10) || "");
    } else {
      setHolidayName("");
      setHolidayDate("");
    }
  }, [editData]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!holidayName || !holidayDate) return;

  const formData = { name: holidayName, date: holidayDate };

  try {
    if (editData && editData._id) {
      const result = await dispatch(
        editHoliday({ holidayId: editData._id, formData })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Holiday updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      await dispatch(AddHolidaycreate(formData)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Holiday added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    setHolidayName("");
    setHolidayDate("");
    onClose && onClose();

    dispatch(getHolidayList());
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err?.message || "Something went wrong!",
    });
  }
};


  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MdHolidayVillage className="text-4xl text-red-500" />
        <h2 className="text-2xl font-bold text-gray-700">
          {editData ? "Edit Holiday" : "Add New Holiday"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Holiday Name
          </label>
          <input
            type="text"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            placeholder="e.g. Diwali"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Date</label>
          <input
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-60"
        >
          {isLoading
            ? editData
              ? "Updating..."
              : "Adding..."
            : editData
            ? "Update Holiday"
            : "Add Holiday"}
        </button>
      </form>
    </div>
  );
};

export default ApplyHoliday;

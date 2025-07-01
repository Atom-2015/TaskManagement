import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getHolidayList } from "../../FeatureRedux/HolidaySlice/GetHolidaySlice";
import { EditOverrIdesCreate } from "../../FeatureRedux/HolidaySlice/EditOverridesSlice";
import { AddOverridesCreate } from "../../FeatureRedux/HolidaySlice/AddOverridesSlice";
import { DelSingleHoliday } from "../../FeatureRedux/HolidaySlice/DeleteSingleHolidaySlice";
import { DelSingleOverrides } from "../../FeatureRedux/HolidaySlice/DeleteSingleOverrides";
import Swal from "sweetalert2";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Overrides = () => {
  const [formDate, setFormDate] = useState("");
  const [formType, setFormType] = useState("holiday");
  const [formReason, setFormReason] = useState("");

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(getHolidayList());
  }, []);

  const { getData, isError, isLoading, errorMessage } = useSelector(
    (state) => state.getHolidayList
  );
  const overrides = [...(getData?.overrides || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  console.log("ye hai data", overrides);

  //const [overrides, setOverrides] = useState(override);
  const openModal = (item = null) => {
    setEditItem(item);
    setFormDate(item?.date?.slice(0, 10) || "");
    setFormType(item?.isWorkingDay ? "working" : "holiday");
    setFormReason(item?.reason || "");

    setShowModal(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const currentYear = new Date().getFullYear();

    doc.setFontSize(18);
    doc.text(`Special Date Overrides - ${currentYear}`, 14, 22);

    const tableColumn = ["#", "Date", "Type", "Reason"];
    const tableRows = overrides.map((item, index) => [
      index + 1,
      new Date(item.date).toLocaleDateString(),
      item.isWorkingDay ? "Working Day" : "Holiday",
      item.reason,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`OverridesList-${currentYear}.pdf`);
  };

  const closeModal = () => {
    setEditItem(null);
    setShowModal(false);
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this override?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(DelSingleOverrides(id)).unwrap();
        dispatch(getHolidayList());

        Swal.fire("Deleted!", "The override has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the override.", "error");
      }
    }
  };

  const handleSubmit = async () => {
    const extractedYear = new Date(formDate).getFullYear();

    const formData = {
      date: formDate,
      isWorkingDay: formType === "working",
      reason: formReason,
      year: extractedYear,
    };

    try {
      if (editItem) {
        await dispatch(
          EditOverrIdesCreate({ overridesId: editItem._id, formData })
        ).unwrap();
        Swal.fire("Updated!", "Override updated successfully.", "success");
      } else {
        await dispatch(AddOverridesCreate(formData)).unwrap();
        Swal.fire("Added!", "Override added successfully.", "success");
      }

      dispatch(getHolidayList());
      closeModal();
    } catch (error) {
      console.error("Submit here", error);
      Swal.fire("Error!", "Failed to submit override.", "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md h-[70vh] flex flex-col border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Special Dates</h2>

        <h2
          onClick={exportPDF}
          title="Download PDF"
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          <MdOutlinePictureAsPdf size={22} />
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg"
          onClick={() => openModal()}
        >
          <IoMdAddCircle className="text-xl" />
          Add Override
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {overrides.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            No overrides added yet.
          </div>
        ) : (
          overrides.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border shadow-sm"
            >
              <div>
                <div className="font-medium text-gray-800">
                  📅 {new Date(item.date).toLocaleDateString()} —{" "}
                  <span
                    className={
                      item.isWorkingDay ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.isWorkingDay ? "Working Day" : "Holiday"}
                  </span>
                </div>
                <div className="text-sm text-gray-600">📝 {item.reason}</div>
              </div>
              <div className="flex gap-3">
                <FaEdit
                  onClick={() => openModal(item)}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  title="Edit"
                />
                <FaTrash
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Centered Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4">
              <motion.div
                className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl px-6 py-7 pointer-events-auto border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {editItem ? "Edit Special Date" : "Add New Special Date"}
                </h3>

                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      value={formDate}
                      type="date"
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="working">✅ Working Day</option>
                      <option value="holiday">🎉 Holiday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason
                    </label>
                    <input
                      value={formReason}
                      type="text"
                      onChange={(e) => setFormReason(e.target.value)}
                      placeholder="E.g., Diwali, Maintenance Work"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-md border text-gray-600 hover:text-gray-800 hover:border-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition"
                  >
                    {editItem ? "Update" : "Add"} Date
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Overrides;


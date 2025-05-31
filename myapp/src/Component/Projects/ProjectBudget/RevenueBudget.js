import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addRevenue } from "../../../FeatureRedux/RevenueSlice/addRevenueSlice";
import { getRevenue } from "../../../FeatureRedux/RevenueSlice/getRevenueSlice";
import { editRevenue } from "../../../FeatureRedux/RevenueSlice/editRevenueSlice";
import Swal from "sweetalert2";

const RevenueBudget = ({
  projectId,
  revenueSearch,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [editingField, setEditingField] = useState({
    id: null,
    field: null,
    value: "",
  });


  // Add this useEffect hook to your RevenueBudget component
useEffect(() => {
  if (isModalOpen) {
    // When modal is open, disable scrolling
    document.body.style.overflow = 'hidden';
  } else {
    // When modal is closed, enable scrolling
    document.body.style.overflow = 'auto';
  }

  // Cleanup function to reset overflow when component unmounts
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isModalOpen]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRevenue());
  }, [dispatch]);

  const getData = useSelector((state) => state.getRevenue?.getData || []);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (getData?.length) {
      const filtered = getData
        .filter((item) => item.projectId?.toString() === projectId?.toString())
        .filter((item) => {
          if (!revenueSearch) return true;
          const search = revenueSearch.toLowerCase();
          return (
            item.milestone?.toLowerCase().includes(search) ||
            item.invoiceNo?.toLowerCase().includes(search)
          );
        });

      setFilterData(filtered || []);
    }
  }, [getData, projectId, revenueSearch]);

  const [formData, setFormData] = useState({
    date: "",
    milestone: "",
    invoiceNo: "",
    basicAmount: "",
    gst: "",
    tds: "",
    received: "",
    pending: "",
    dueDate: "",
    status: "Pending",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFieldClick = (id, field, value) => {
    setEditingField({
      id,
      field,
      value:
        (field === "date" || field === "dueDate") && value
          ? new Date(value).toISOString().split("T")[0]
          : value || "",
    });
  };

  const handleEditChange = (e) => {
    setEditingField((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  const handleEditSubmit = async (e) => {
    if (e.key === "Enter") {
      try {
        const updatedData = {
          [editingField.field]: editingField.value,
        };

        const resultAction = await dispatch(
          editRevenue({
            revenueId: editingField.id,
            updateData: updatedData,
          })
        );

        if (editRevenue.fulfilled.match(resultAction)) {
          await dispatch(getRevenue());

          Swal.fire({
            icon: "success",
            title: "Updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          setEditingField({
            id: null,
            field: null,
            value: "",
          });
        } else {
          throw new Error(resultAction.error.message);
        }
      } catch (error) {
        console.error("Error updating field:", error);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: error.message || "Please try again later.",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addRevenue({ ...formData, projectId }));
      await dispatch(getRevenue());

      Swal.fire({
        icon: "success",
        title: "Revenue added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsModalOpen(false);
      setFormData({
        date: "",
        milestone: "",
        invoiceNo: "",
        basicAmount: "",
        gst: "",
        tds: "",
        received: "",
        pending: "",
        dueDate: "",
        status: "Pending",
        comment: "",
      });
    } catch (error) {
      console.error("Error adding revenue:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again later.",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Revenue Table */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
        <div className="max-h-[200px] overflow-y-auto">
          <table className="w-full text-sm text-gray-800">
            <thead className="bg-blue-700 text-white text-[15px]">
              <tr>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Milestone</th>
                <th className="p-2 text-center">Invoice No.</th>
                <th className="p-2 text-center">Basic Amount</th>
                <th className="p-2 text-center">GST</th>
                <th className="p-2 text-center">TDS</th>
                <th className="p-2 text-center">Received</th>
                <th className="p-2 text-center">Pending</th>
                <th className="p-2 text-center">Due Date</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Comment</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-all">
                  {/* Date */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "date", item.date)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "date" ? (
                      <input
                        type="date"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      formatDate(item.date)
                    )}
                  </td>

                  {/* Milestone */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "milestone", item.milestone)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "milestone" ? (
                      <input
                        type="text"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.milestone || "-"
                    )}
                  </td>

                  {/* Invoice No */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "invoiceNo", item.invoiceNo)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "invoiceNo" ? (
                      <input
                        type="text"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.invoiceNo || "-"
                    )}
                  </td>

                  {/* Basic Amount */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(
                        item._id,
                        "basicAmount",
                        item.basicAmount
                      )
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "basicAmount" ? (
                      <input
                        type="number"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.basicAmount || "-"
                    )}
                  </td>

                  {/* GST */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() => handleFieldClick(item._id, "gst", item.gst)}
                  >
                    {editingField.id === item._id &&
                    editingField.field === "gst" ? (
                      <input
                        type="number"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.gst || "-"
                    )}
                  </td>

                  {/* TDS */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() => handleFieldClick(item._id, "tds", item.tds)}
                  >
                    {editingField.id === item._id &&
                    editingField.field === "tds" ? (
                      <input
                        type="number"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.tds || "-"
                    )}
                  </td>

                  {/* Received */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "received", item.received)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "received" ? (
                      <input
                        type="number"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.received || "-"
                    )}
                  </td>

                  {/* Pending */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "pending", item.pending)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "pending" ? (
                      <input
                        type="number"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.pending || "-"
                    )}
                  </td>

                  {/* Due Date */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "dueDate", item.dueDate)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "dueDate" ? (
                      <input
                        type="date"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      formatDate(item.dueDate)
                    )}
                  </td>

                  {/* Status */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "status", item.status)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "status" ? (
                      <select
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        } font-semibold`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>

                  {/* Comment */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() =>
                      handleFieldClick(item._id, "comment", item.comment)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "comment" ? (
                      <input
                        type="text"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-[100px] px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                        autoFocus
                      />
                    ) : (
                      item.comment || "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Revenue Modal */}
   {isModalOpen && (
  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-2">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[80vh] overflow-y-auto mt-10 mb-10">
      
      {/* Modal Header */}
      <div className="sticky top-0  z-10 flex justify-between items-center border-b border-gray-100 p-3 bg-white">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
          Add New Revenue
        </h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Modal Body */}
      <form
        onSubmit={handleSubmit}
        className="p-4 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
              required
            />
          </div>

          {/* Milestone */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Milestone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="milestone"
              value={formData.milestone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
              placeholder="Project milestone"
              required
            />
          </div>

          {/* Invoice No */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Invoice No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
              placeholder="INV-2023-001"
              required
            />
          </div>

          {/* Basic Amount */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Basic Amount (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                name="basicAmount"
                value={formData.basicAmount}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* GST */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              GST (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                name="gst"
                value={formData.gst}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* TDS */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              TDS (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                name="tds"
                value={formData.tds}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Received */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Received (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                name="received"
                value={formData.received}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Pending */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Pending (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                type="number"
                name="pending"
                value={formData.pending}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            rows="1"
            placeholder="Additional notes..."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-100"
          >
            Add Revenue
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default RevenueBudget;

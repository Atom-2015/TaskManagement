import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRevenue } from "../../../FeatureRedux/RevenueSlice/addRevenueSlice";
import { useSelector } from "react-redux";
import { getRevenue } from "../../../FeatureRedux/RevenueSlice/getRevenueSlice";
import { editRevenue } from "../../../FeatureRedux/RevenueSlice/editRevenueSlice";
import Swal from 'sweetalert2';


const RevenueBudget = ({ projectId, isModalOpen, setIsModalOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRevenueId, setEditRevenueId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRevenue());
  }, [dispatch]);

  const getData = useSelector((state) => state.getRevenue?.getData || []);
 

  const filterData = getData?.filter(
    (item) => item.projectId?.toString() === projectId?.toString()
  );




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

  const { realData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.addRevenue
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isEditing && editRevenueId) {
      await dispatch(
        editRevenue({
          revenueId: editRevenueId,
          updateData: { ...formData, projectId },
        })
      );
     await dispatch(getRevenue());
      Swal.fire({
        icon: 'success',
        title: 'Revenue updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await dispatch(addRevenue({ ...formData, projectId }));
     await dispatch(getRevenue());
      Swal.fire({
        icon: 'success',
        title: 'Revenue added successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // Close modal and reset form
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
      icon: 'error',
      title: 'Something went wrong!',
      text: 'Please try again later.',
    });
  }
};


  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto max-h-[200px] overflow-y-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-blue-700 text-white text-[15px]">
            <tr>
              <th className="border border-gray-400 p-1 min-w-[105px] text-center">
                Date
              </th>
              <th className="border border-gray-400 p-1 min-w-[80px] text-center">
                Milestone
              </th>
              <th className="border border-gray-400 p-1 min-w-[100px] text-center">
                Invoice No.
              </th>
              <th className="border border-gray-400 p-1 text-center">
                Basic Amount
              </th>
              <th className="border border-gray-400 p-1 min-w-[50px] text-center">
                GST
              </th>
              <th className="border border-gray-400 p-1 text-center">TDS</th>
              <th className="border border-gray-400 p-1 text-center">
                Received
              </th>
              <th className="border border-gray-400 p-1 text-center">
                Pending
              </th>
              <th className="border border-gray-400 p-1 min-w-[110px] text-center">
                Due Date
              </th>
              <th className="border border-gray-400 p-1 text-center">Status</th>
              <th className="border border-gray-400 p-1 text-center">
                Comment
              </th>
            </tr>
          </thead>

          {filterData.map((item) => (
            <tbody>
              <tr
                key={item._id}
                onClick={() => {
                  setFormData({
                    date: item.date.split("T")[0],
                    milestone: item.milestone,
                    invoiceNo: item.invoiceNo,
                    basicAmount: item.basicAmount,
                    gst: item.gst,
                    tds: item.tds,
                    received: item.received,
                    pending: item.pending,
                    dueDate: item.dueDate.split("T")[0],
                    status: item.status,
                    comment: item.comment,
                  });
                  setEditRevenueId(item._id);
                  setIsEditing(true);
                  setIsModalOpen(true);
                }}
                className="hover:bg-gray-50 transition-all cursor-pointer"
              >
                <td className="p-3 text-center">{new Date(item.date).toLocaleDateString("en-IN")}</td>
                <td className="p-3 text-center">{item.milestone}</td>
                <td className="p-3 text-center">{item.invoiceNo}</td>
                <td className="p-3 text-center">{item.basicAmount}</td>
                <td className="p-3 text-center">{item.gst}</td>
                <td className="p-3 text-center">{item.tds}</td>
                <td className="p-3 text-center">{item.received}</td>
                <td className="p-3 text-center">{item.pending}</td>
                <td className="p-3 text-center">
                  {item.dueDate.split("T")[0]}
                </td>
                <td className="p-3 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                    {item.status}
                  </span>
                </td>
                <td className="p-3 italic text-gray-500">{item.comment}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Add Revenue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ">
            <div className="flex justify-between items-center border-b border-gray-100 p-3 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New Revenue
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="date"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                </div>

                {/* Milestone Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="milestone"
                  >
                    Milestone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="milestone"
                    name="milestone"
                    value={formData.milestone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Project milestone"
                  />
                </div>

                {/* Invoice No Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="invoiceNo"
                  >
                    Invoice No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="invoiceNo"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="INV-2023-001"
                  />
                </div>

                {/* Basic Amount Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="basicAmount"
                  >
                    Basic Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="basicAmount"
                      name="basicAmount"
                      value={formData.basicAmount}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* GST Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="gst"
                  >
                    GST (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="gst"
                      name="gst"
                      value={formData.gst}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* TDS Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="tds"
                  >
                    TDS (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="tds"
                      name="tds"
                      value={formData.tds}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Received Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="received"
                  >
                    Received (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="received"
                      name="received"
                      value={formData.received}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Pending Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="pending"
                  >
                    Pending (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="pending"
                      name="pending"
                      value={formData.pending}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Due Date Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="dueDate"
                  >
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="status"
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-right-3 bg-[length:1.5rem]"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="comment"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  rows="3"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm shadow-blue-100"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    {isEditing ? "update Revenue" :"Add Revenue" }
                  </div>
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

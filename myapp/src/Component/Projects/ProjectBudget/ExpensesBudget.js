import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { getExpense } from "../../../FeatureRedux/expenseSlice/getExpenseSlice";
import { addExpense } from "../../../FeatureRedux/expenseSlice/addExpenseSlice";
import { editExpense } from "../../../FeatureRedux/expenseSlice/editExpenseSlice";



const ExpensesBudget = ({ projectId, isOpen, setIsOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);


  const [formData, setFormData] = useState({
    date: "",
    paidTo: "",
    invoiceNo: "",
    amount: "",
    gst: "",
    tds: "",
    comment: "",
  });

  
  const getData = useSelector((state) => state.getExpense?.getData || []);


  const filterData = getData?.filter(
    (item) => item.projectId?.toString() === projectId?.toString()
  );
 

  const { realData, isLoading, isError, errorMessage } = useSelector(
    (state) => state.addExpense
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
      if (isEditing && editExpenseId) {
        await dispatch(
          editExpense({
            expenseId: editExpenseId,
            updateData: { ...formData, projectId },
          })
        );
        await dispatch(getExpense());
      } else {
        await dispatch(addExpense({ ...formData, projectId }));
        await dispatch(getExpense());
      }
     
      setIsOpen(false);
      setFormData({
        date: "",
        paidTo: "",
        invoiceNo: "",
        amount: "",
        gst: "",
        tds: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto max-h-[200px] overflow-y-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-red-600 text-white text-[15px]">
            <tr>
              <th className="border border-gray-400 p-1 text-center">Serial No.</th>
              <th className="border border-gray-400 p-1 min-w-[110px] text-center">Date</th>
              <th className="border border-gray-400 p-1 text-center">Paid To</th>
              <th className="border border-gray-400 p-1 min-w-[110px] text-center">Invoice No.</th>
              <th className="border border-gray-400 p-1 text-center">Amount</th>
              <th className="border border-gray-400 p-1 text-center">GST</th>
              <th className="border border-gray-400 p-1 text-center">TDS</th>
              <th className="border border-gray-400 p-1 text-center">Comment</th>
            </tr>
          </thead>

          {filterData.map((item, index) => (
            <tbody key={item._id}>
              <tr
                onClick={() => {
                  setFormData({
                    date: item.date.split("T")[0],
                    paidTo: item.paidTo,
                    invoiceNo: item.invoiceNo,
                    amount: item.amount,
                    gst: item.gst,
                    tds: item.tds,
                    comment: item.comment,
                  });
                  setEditExpenseId(item._id);
                  setIsEditing(true);
                  setIsOpen(true);
                }}
                className="hover:bg-gray-50 transition-all cursor-pointer"
              >
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{new Date(item.date).toLocaleDateString("en-IN")}</td>
                <td className="p-3 text-center">{item.paidTo}</td>
                <td className="p-3 text-center">{item.invoiceNo}</td>
                <td className="p-3 text-center">₹{item.amount}</td>
                <td className="p-3 text-center">₹{item.gst}</td>
                <td className="p-3 text-center">₹{item.tds}</td>
                <td className="p-3 italic text-gray-500">{item.comment}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Add Expense Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ">
            <div className="flex justify-between items-center border-b border-gray-100 p-3 bg-gradient-to-r from-red-50 to-pink-50">
              <h3 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Edit Expense" : "Add New Expense"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
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
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    required
                  />
                </div>

                {/* Paid To Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="paidTo"
                  >
                    Paid To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="paidTo"
                    name="paidTo"
                    value={formData.paidTo}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    required
                    placeholder="Vendor/Supplier name"
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
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    required
                    placeholder="EXP-2023-001"
                  />
                </div>

                {/* Amount Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="amount"
                  >
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
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
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
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
                      className="block w-full pl-8 pr-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                      required
                      placeholder="0.00"
                    />
                  </div>
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
                  className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                  rows="3"
                  placeholder="Additional notes..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all duration-200 shadow-sm shadow-red-100"
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
                    {isEditing ? "Update Expense" : "Add Expense"}
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

export default ExpensesBudget;
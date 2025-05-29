import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getExpense } from "../../../FeatureRedux/expenseSlice/getExpenseSlice";
import { addExpense } from "../../../FeatureRedux/expenseSlice/addExpenseSlice";
import { editExpense } from "../../../FeatureRedux/expenseSlice/editExpenseSlice";
import Swal from "sweetalert2";

const ExpensesBudget = ({ projectId, isOpen, setIsOpen }) => {
  const [editingField, setEditingField] = useState({
    id: null,
    field: null,
    value: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle click on a table cell to start editing
  const handleFieldClick = (id, field, value) => {
    setEditingField({
      id,
      field,
      value: field === 'date' && value 
        ? new Date(value).toISOString().split('T')[0] 
        : value || ""
    });
  };

  // Handle change during inline editing
  const handleEditChange = (e) => {
    setEditingField(prev => ({
      ...prev,
      value: e.target.value
    }));
  };

  // Save edited field when Enter is pressed
  const handleEditSubmit = async (e) => {
    if (e.key === 'Enter') {
      try {
        const updatedData = {
          [editingField.field]: editingField.value
        };
        
        const resultAction = await dispatch(editExpense({ 
          expenseId: editingField.id, 
          updateData: updatedData 
        }));
        
        if (editExpense.fulfilled.match(resultAction)) {
          // Refresh data after successful edit
          await dispatch(getExpense());
          
          Swal.fire({
            icon: "success",
            title: "Updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          
          setEditingField({
            id: null,
            field: null,
            value: ""
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
      await dispatch(addExpense({ ...formData, projectId }));
      await dispatch(getExpense());
      
      Swal.fire({
        icon: "success",
        title: "Expense added!",
        showConfirmButton: false,
        timer: 1500,
      });

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
      Swal.fire({
        icon: "error",
        title: "Failed to add expense",
        text: "Please try again later.",
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto max-h-[200px] overflow-y-auto">
        <div className="max-h-[200px] overflow-y-auto">
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
          <tbody>
            {filterData.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-all">
                {/* Serial No */}
                <td className="p-3 text-center">{index + 1}</td>
                
                {/* Date */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'date', item.date)}
                >
                  {editingField.id === item._id && editingField.field === 'date' ? (
                    <input
                      type="date"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    formatDate(item.date)
                  )}
                </td>
                
                {/* Paid To */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'paidTo', item.paidTo)}
                >
                  {editingField.id === item._id && editingField.field === 'paidTo' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-[100px]   px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    item.paidTo || "-"
                  )}
                </td>
                
                {/* Invoice No */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'invoiceNo', item.invoiceNo)}
                >
                  {editingField.id === item._id && editingField.field === 'invoiceNo' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    item.invoiceNo || "-"
                  )}
                </td>
                
                {/* Amount */}
                <td 
                  className="p-3 w-14 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'amount', item.amount)}
                >
                  {editingField.id === item._id && editingField.field === 'amount' ? (
                    <input
                      type="number"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-[100px] px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    `₹${item.amount}` || "-"
                  )}
                </td>
                
                {/* GST */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'gst', item.gst)}
                >
                  {editingField.id === item._id && editingField.field === 'gst' ? (
                    <input
                      type="number"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-[100px] px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    `₹${item.gst}` || "-"
                  )}
                </td>
                
                {/* TDS */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'tds', item.tds)}
                >
                  {editingField.id === item._id && editingField.field === 'tds' ? (
                    <input
                      type="number"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-[100px] px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                      autoFocus
                    />
                  ) : (
                    `₹${item.tds}` || "-"
                  )}
                </td>
                
                {/* Comment */}
                <td 
                  className="p-3 italic text-gray-500 cursor-pointer hover:bg-red-50"
                  onClick={() => handleFieldClick(item._id, 'comment', item.comment)}
                >
                  {editingField.id === item._id && editingField.field === 'comment' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-[150px] px-2 py-1 border border-red-300 rounded focus:outline-red-500"
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

      {/* Add Expense Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ">
            <div className="flex justify-between items-center border-b border-gray-100 p-3 bg-gradient-to-r from-red-50 to-pink-50">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New Expense
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
                  <label className="block text-sm font-medium text-gray-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                    required
                  />
                </div>

                {/* Paid To Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Paid To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
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
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
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
                  <label className="block text-sm font-medium text-gray-700">
                    GST (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
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
                  <label className="block text-sm font-medium text-gray-700">
                    TDS (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
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
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
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
                    Add Expense
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
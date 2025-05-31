import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getClientDis } from "../../../FeatureRedux/ClientDisSlice/getClientdisSlice";
import { addClientDis } from "../../../FeatureRedux/ClientDisSlice/addClientdisSlice";
import { editClientDis } from "../../../FeatureRedux/ClientDisSlice/editClientdisSlice";
import Swal from "sweetalert2";

const DiscussionRevenue = ({ clientDisSearch,projectId, isRevOpen, setIsRevOpen }) => {
  const [editingField, setEditingField] = useState({
    id: null,
    field: null,
    value: ""
  });

  const dispatch = useDispatch();

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getClientDis());
  }, [dispatch]);

  // Get data from Redux store
  const getData = useSelector((state) => state.getClientDis?.getData || []);
  const [filterData, setFilterData] = useState([]);
  
  // Filter data based on projectId
useEffect(() => {
  if (getData?.data) {
    const filtered = getData.data
      .filter((item) => item.projectId?.toString() === projectId?.toString())
      .filter((item) => {
        if (!clientDisSearch) return true;
        const search = clientDisSearch.toLowerCase();
        return (
          item.client_name?.toLowerCase().includes(search) ||
          item.discussed_by?.toLowerCase().includes(search)
        );
      });
    setFilterData(filtered || []);
  }
}, [getData, projectId, clientDisSearch]);


  // Form state for adding new discussion
  const [formData, setFormData] = useState({
    client_name: "",
    discussed_by: "",
    phone_no: "",
    comment: "",
    next_update: "",
  });

  // Handle input change for add form
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
      value: field === 'next_update' && value 
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
      
      const resultAction = await dispatch(editClientDis({ 
        clientId: editingField.id, 
        data: updatedData 
      }));
      
      if (editClientDis.fulfilled.match(resultAction)) {
        // Refresh data after successful edit
        await dispatch(getClientDis());
        
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

  // Handle form submission for new discussion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addClientDis({ ...formData, projectId }));
      await dispatch(getClientDis());
      
      Swal.fire({
        icon: "success",
        title: "Discussion added!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form and close modal
      setIsRevOpen(false);
      setFormData({
        client_name: "",
        discussed_by: "",
        phone_no: "",
        comment: "",
        next_update: "",
      });
    } catch (error) {
      console.error("Error adding discussion:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add discussion",
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
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Discussions Table */}
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto">
         <div className="max-h-[200px] overflow-y-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-blue-700 text-white text-[15px]">
            <tr>
              <th className="p-2 text-center">Client Name</th>
              <th className="p-2 text-center">Discussed By</th>
              <th className="p-2 text-center">Phone No</th>
              <th className="p-2 text-center">Comment</th>
              <th className="p-2 text-center">Next Update</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-all">
                {/* Client Name */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleFieldClick(item._id, 'client_name', item.client_name)}
                >
                  {editingField.id === item._id && editingField.field === 'client_name' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                      autoFocus
                    />
                  ) : (
                    item.client_name || "-"
                  )}
                </td>

                {/* Discussed By */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleFieldClick(item._id, 'discussed_by', item.discussed_by)}
                >
                  {editingField.id === item._id && editingField.field === 'discussed_by' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                      autoFocus
                    />
                  ) : (
                    item.discussed_by || "-"
                  )}
                </td>

                {/* Phone No */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleFieldClick(item._id, 'phone_no', item.phone_no)}
                >
                  {editingField.id === item._id && editingField.field === 'phone_no' ? (
                    <input
                      type="tel"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                      autoFocus
                    />
                  ) : (
                    item.phone_no || "-"
                  )}
                </td>

                {/* Comment */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleFieldClick(item._id, 'comment', item.comment)}
                >
                  {editingField.id === item._id && editingField.field === 'comment' ? (
                    <input
                      type="text"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                      autoFocus
                    />
                  ) : (
                    item.comment || "-"
                  )}
                </td>

                {/* Next Update */}
                <td 
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleFieldClick(item._id, 'next_update', item.next_update)}
                >
                  {editingField.id === item._id && editingField.field === 'next_update' ? (
                    <input
                      type="date"
                      value={editingField.value}
                      onChange={handleEditChange}
                      onKeyDown={handleEditSubmit}
                      onBlur={() => setEditingField({ id: null, field: null, value: "" })}
                      className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-blue-500"
                      autoFocus
                    />
                  ) : (
                    formatDate(item.next_update)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add Discussion Modal */}
      {isRevOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300">
            <div className="flex justify-between items-center border-b border-gray-100 p-3 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New Discussion
              </h3>
              <button
                onClick={() => setIsRevOpen(false)}
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
                {/* Client Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Client name"
                  />
                </div>

                {/* Discussed By */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Discussed By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="discussed_by"
                    value={formData.discussed_by}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Person who discussed"
                  />
                </div>

                {/* Phone No */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Phone number"
                  />
                </div>

                {/* Next Update */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Next Update Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="next_update"
                    value={formData.next_update}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  rows="3"
                  placeholder="Discussion details..."
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRevOpen(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm shadow-blue-100"
                >
                  Add Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionRevenue;
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getClientDis } from "../../../FeatureRedux/ClientDisSlice/getClientdisSlice";
import { useSelector } from "react-redux";
import { addClientDis } from "../../../FeatureRedux/ClientDisSlice/addClientdisSlice";
import { editClientDis } from "../../../FeatureRedux/ClientDisSlice/editClientdisSlice";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { delClientDis } from "../../../FeatureRedux/ClientDisSlice/deleteClientdisSlice";
import { filter } from "d3";

const DiscussionRevenue = ({
  projectId,
  isRevOpen,
  setIsRevOpen,
  searchTerm = "",
}) => {
  const [editingField, setEditingField] = useState({
    id: null,
    field: null,
    value: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientDis());
  }, [dispatch]);

  const getData = useSelector((state) => state.getClientDis?.getData || []);

  const filterData = useMemo(() => {
    if (!getData?.data) return [];

    // First filter by projectId
    const projectFiltered = getData.data.filter(
      (item) => item.projectId?.toString() === projectId?.toString()
    );

    // Then apply search filter if searchTerm exists
    if (!searchTerm) return projectFiltered;

    const lowerSearch = searchTerm.toLowerCase();

    return projectFiltered.filter(
      (item) =>
        item.client_name?.toLowerCase().includes(lowerSearch) ||
        item.discussed_by?.toLowerCase().includes(lowerSearch)
    );
  }, [getData, projectId, searchTerm]);

  const [formData, setFormData] = useState({
    client_name: "",
    discussed_by: "",
    phone_no: "",
    comment: "",
    next_update: "",
  });

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
      value:
        field === "next_update" && value
          ? new Date(value).toISOString().split("T")[0]
          : value || "",
    });
  };

  // Handle change during inline editing
  const handleEditChange = (e) => {
    setEditingField((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  };

  // Save edited field when Enter is pressed
  const handleEditSubmit = async (e) => {
    if (e.key === "Enter") {
      try {
        const updatedData = {
          [editingField.field]: editingField.value,
        };

        await dispatch(
          editClientDis({
            clientId: editingField.id,
            data: updatedData,
          })
        );

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
          value: "",
        });
      } catch (error) {
        console.error("Error updating discussion:", error);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Please try again later.",
        });
      }
    }
  };
  const handleDelete = async (clientId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await dispatch(delClientDis( clientId ));
        await dispatch(getClientDis());
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addClientDis({ ...formData, projectId }));
      await dispatch(getClientDis());
      Swal.fire({
        icon: "success",
        title: "Discussion added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

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
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto max-h-[150px] overflow-y-auto">
        <table className="w-full text-sm text-gray-800 ">
          <thead className="bg-blue-700 text-white text-[15px]">
            <tr>
              <th className="p-2 text-center">Client Name</th>
              <th className="p-2 text-center">Discussed By</th>
              <th className="p-2 text-center">Phone No</th>
              <th className="p-2 text-center">Comment</th>
              <th className="p-2 text-center">Next Update</th>
              <th className="p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterData.length === 0 && (
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No Client discussion found
              </td>
            )}
            
            {filterData?.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-all">
                {/* Client Name */}
                <td
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() =>
                    handleFieldClick(item._id, "client_name", item.client_name)
                  }
                >
                  {editingField.id === item._id &&
                  editingField.field === "client_name" ? (
                    <input
                      type="text"
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
                    item.client_name || "-"
                  )}
                </td>

                {/* Discussed By */}
                <td
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() =>
                    handleFieldClick(
                      item._id,
                      "discussed_by",
                      item.discussed_by
                    )
                  }
                >
                  {editingField.id === item._id &&
                  editingField.field === "discussed_by" ? (
                    <input
                      type="text"
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
                    item.discussed_by || "-"
                  )}
                </td>

                {/* Phone No */}
                <td
                  className="p-3 text-center cursor-pointer hover:bg-blue-50"
                  onClick={() =>
                    handleFieldClick(item._id, "phone_no", item.phone_no)
                  }
                >
                  {editingField.id === item._id &&
                  editingField.field === "phone_no" ? (
                    <input
                      type="text"
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
                    item.phone_no || "-"
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
                  onClick={() =>
                    handleFieldClick(item._id, "next_update", item.next_update)
                  }
                >
                  {editingField.id === item._id &&
                  editingField.field === "next_update" ? (
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
                    formatDate(item.next_update)
                  )}
                </td>
                <td className="p-3 text-center cursor-pointer">
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(item._id);
                      console.log("delete karna hai",item._id);
                    }}
                    className="inline-block text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Discussion Modal */}
      {isRevOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ">
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
                {/* Client Name Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="client_name"
                  >
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="client_name"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Client name"
                  />
                </div>

                {/* Discussed By Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="discussed_by"
                  >
                    Discussed By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="discussed_by"
                    name="discussed_by"
                    value={formData.discussed_by}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Person who discussed"
                  />
                </div>

                {/* Phone No Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="phone_no"
                  >
                    Phone No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="phone_no"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                    placeholder="Phone number"
                  />
                </div>

                {/* Next Update Field */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="next_update"
                  >
                    Next Update Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="next_update"
                    name="next_update"
                    value={formData.next_update}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="comment"
                >
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
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
                    Add Discussion
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

export default DiscussionRevenue;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseDiscussion } from "../../../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion";
import { deleteExpenceDiscussion } from "../../../FeatureRedux/expenceDiscussionSlice/deleteExpenceDiscussion";
import { editExpenseDiscussion } from "../../../FeatureRedux/expenceDiscussionSlice/editExpenseDiscussionSlice";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const DiscussionExpenses = ({ projectId }) => {
  const dispatch = useDispatch();
  const [editingField, setEditingField] = useState({
    id: null,
    field: null,
    value: "",
  });

  useEffect(() => {
    if (projectId) {
      dispatch(getExpenseDiscussion({ projectId }));
    }
  }, [dispatch, projectId]);

  const handleFieldClick = (id, field, value) => {
    setEditingField({
      id,
      field,
      value:
        field === "nextFollowUp" && value
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
        const originalItem = getData.find(
          (item) => item._id === editingField.id
        );
        if (!originalItem) return;

        // Create full update payload
        const updatedData = {
          date: originalItem.date,
          clientName: originalItem.clientName,
          discussedBy: originalItem.discussedBy,
          pending: originalItem.pending,
          comment: originalItem.comment,
          nextFollowUp: originalItem.nextFollowUp,
        };

        // Apply updated field
        updatedData[editingField.field] =
          editingField.field === "pending"
            ? editingField.value === "true"
            : editingField.value;

        // Ensure pending is boolean
        if (editingField.field === "pending") {
          updatedData.pending = editingField.value === "true";
        }

        // Dispatch update
        await dispatch(
          editExpenseDiscussion({
            discussionId: editingField.id,
            projectId,
            updatedData,
          })
        );

        // Refresh data
        await dispatch(getExpenseDiscussion({ projectId }));

        Swal.fire({
          icon: "success",
          title: "Updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setEditingField({ id: null, field: null, value: "" });
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

  const handleDelete = async (discussionId) => {
    console.log("check fort discuuesif", discussionId);
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
      try {
        const res = await dispatch(deleteExpenceDiscussion({ discussionId }));
        console.log("Dispatch response:", res);
        dispatch(getExpenseDiscussion({ projectId }));
        Swal.fire("Deleted!", "The discussion has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete discussion.", "error");
        console.error("Error deleting discussion:", error);
      }
    }
  };

  const { getData, isError, isLoading, isSuccess } = useSelector(
    (state) => state.getExpenseDiscussion
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-xl shadow-md overflow-x-auto max-h-[150px] overflow-y-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-red-600 text-white text-[15px]">
            <tr>
              <th className="p-2 text-center">Date</th>
              <th className="p-2 text-center">Client Name</th>
              <th className="p-2 text-center">Discussed By</th>
              <th className="p-2 text-center">Pending</th>
              <th className="p-2 text-center">Comment</th>
              <th className="p-2 text-center">Next FollowUp</th>
              <th className="p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray === 0 && (
              <tr>
                 <td colSpan="13" className="text-center py-4 text-gray-500">
                    No revenue data available.
                  </td>
              </tr>
            )}
            {Array.isArray(getData) && getData.length > 0 ? (
              getData.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  {/* Date */}
                  <td className="p-3 text-center">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-IN")
                      : "N/A"}
                  </td>

                  {/* Client Name */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      handleFieldClick(item._id, "clientName", item.clientName)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "clientName" ? (
                      <input
                        type="text"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                        autoFocus
                      />
                    ) : (
                      item.clientName || "-"
                    )}
                  </td>

                  {/* Discussed By */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      handleFieldClick(
                        item._id,
                        "discussedBy",
                        item.discussedBy
                      )
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "discussedBy" ? (
                      <input
                        type="text"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                        autoFocus
                      />
                    ) : (
                      item.discussedBy || "-"
                    )}
                  </td>

                  {/* Pending */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      handleFieldClick(item._id, "pending", item.pending)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "pending" ? (
                      <select
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                        autoFocus
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : item.pending ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>

                  {/* Comment */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      handleFieldClick(item._id, "comment", item.comment)
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "comment" ? (
                      <textarea
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                        rows={2}
                        autoFocus
                      />
                    ) : (
                      item.comment || "-"
                    )}
                  </td>

                  {/* Next FollowUp */}
                  <td
                    className="p-3 text-center cursor-pointer hover:bg-red-50"
                    onClick={() =>
                      handleFieldClick(
                        item._id,
                        "nextFollowUp",
                        item.nextFollowUp
                      )
                    }
                  >
                    {editingField.id === item._id &&
                    editingField.field === "nextFollowUp" ? (
                      <input
                        type="date"
                        value={editingField.value}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        onBlur={() =>
                          setEditingField({ id: null, field: null, value: "" })
                        }
                        className="w-full px-2 py-1 border border-red-300 rounded focus:outline-red-500"
                        autoFocus
                      />
                    ) : (
                      formatDate(item.nextFollowUp)
                    )}
                  </td>

                  <td className="p-3 text-center cursor-pointer">
                    <FaTrashAlt
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="inline-block text-red-600"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  {isLoading
                    ? "Loading..."
                    : isError
                    ? "No discussions found"
                    : "No discussions found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscussionExpenses;

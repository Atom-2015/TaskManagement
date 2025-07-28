import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetLeavePolicy } from "../../../FeatureRedux/LeavePolicySlice/GetLeavePolicy";
import { addLeavePolicy } from "../../../FeatureRedux/LeavePolicySlice/AddLeavePolicy";
import { deleteLeavePolicy } from "../../../FeatureRedux/LeavePolicySlice/DeleteLeavePolicy";
import { Trash2 } from "lucide-react"; // Optional: Replace with any delete icon
import Swal from "sweetalert2";

const AddLeavePolicy = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveEntries, setLeaveEntries] = useState([{ type: "", days: "" }]);
  const dispatch = useDispatch();

  const { getData } = useSelector((state) => state.GetLeavePolicy);
  const deleteStatus = useSelector((state) => state.deleteleavePolicy);

  useEffect(() => {
    dispatch(GetLeavePolicy());
  }, [dispatch]);

  const realData = getData?.data?.leaves || [];

 const handleSubmit = () => {
  const cleanedData = leaveEntries
    .filter((entry) => entry.type && entry.days)
    .map((entry) => ({
      type: entry.type.trim().toUpperCase(),
      days: Number(entry.days),
    }));

  if (cleanedData.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete data',
      text: 'Please enter at least one valid leave type and day count.',
    });
    return;
  }

  dispatch(addLeavePolicy(cleanedData)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Leave policy submitted successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      setModalOpen(false);
      setLeaveEntries([{ type: "", days: "" }]);
      dispatch(GetLeavePolicy());
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to submit leave policy.',
      });
    }
  });
};


  const handleDelete = (type) => {
  Swal.fire({
    title: `Delete "${type}" leave?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteLeavePolicy(type)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", `"${type}" leave has been deleted.`, "success");
          dispatch(GetLeavePolicy());
        } else {
          Swal.fire("Error!", "Failed to delete leave policy.", "error");
        }
      });
    }
  });
};


  return (
    <div className="max-w-4xl mx-auto p-2 bg-white shadow-md rounded-xl mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Leave Policy</h2>
        <button
          className="px-2 py-1 bg-slate-700 hover:bg-slate-800 text-white rounded-lg shadow"
          onClick={() => setModalOpen(true)}
        >
          + Add Leave Policy
        </button>
      </div>

      {realData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {realData.map((item, index) => (
            <div
              key={index}
              className="relative p-2 bg-blue-100 rounded-lg border border-blue-300 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">{item.type}</h3>
              <p className="text-sm text-gray-600">
                Days Allowed: <span className="font-medium">{item.days}</span>
              </p>
              <button
                onClick={() => handleDelete(item.type)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">
          No leave policies available.
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Add Leave Policy</h3>
            <form>
              {leaveEntries.map((entry, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type
                  </label>
                  <input
                    type="text"
                    value={entry.type}
                    onChange={(e) => {
                      const newEntries = [...leaveEntries];
                      newEntries[index].type = e.target.value;
                      setLeaveEntries(newEntries);
                    }}
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
                    Days Allowed
                  </label>
                  <input
                    type="number"
                    value={entry.days}
                    onChange={(e) => {
                      const newEntries = [...leaveEntries];
                      newEntries[index].days = Number(e.target.value);
                      setLeaveEntries(newEntries);
                    }}
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => setLeaveEntries([...leaveEntries, { type: "", days: "" }])}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-4"
              >
                + Add Another Leave Type
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Submit Leave Policy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLeavePolicy;

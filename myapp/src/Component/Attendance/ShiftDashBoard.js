import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShift } from '../../FeatureRedux/ShiftingSlice/getShiftSlice';
import { createShift } from '../../FeatureRedux/ShiftingSlice/AddShiftSlice';
import { deleteShift } from '../../FeatureRedux/ShiftingSlice/DeleteShiftSlice';
import { editShift } from '../../FeatureRedux/ShiftingSlice/EditShiftSlice';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import {
  FiClock, FiCoffee, FiSunrise, FiSunset, FiWatch, FiPlus, FiTrash2, FiEdit
} from 'react-icons/fi';

const ShiftDashBoard = () => {
  const dispatch = useDispatch();
  const { getData: shiftList, isLoading, isError, errorMessage } = useSelector(state => state.getShift);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    punchIn: '',
    punchOut: '',
  });

  useEffect(() => {
    dispatch(getShift());
  }, [dispatch]);

  const shifts = shiftList?.shifts || [];

  const calculateDuration = (start, end) => {
    const startTime = new Date(`2000-01-01T${start}`);
    let endTime = new Date(`2000-01-01T${end}`);
    if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);
    const diff = endTime - startTime;
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}h ${m}m`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editShift({ shiftId: editId, updatedData: formData }))
        .then(() => {
          Swal.fire('Updated!', 'Shift updated successfully.', 'success');
          dispatch(getShift());
          resetForm();
        });
    } else {
      dispatch(createShift(formData)).then(() => {
        Swal.fire('Added!', 'New shift created successfully.', 'success');
        dispatch(getShift());
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', punchIn: '', punchOut: '' });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleDelete = (shiftId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This shift will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShift(shiftId)).then(() => {
          Swal.fire('Deleted!', 'Shift has been deleted.', 'success');
          dispatch(getShift());
        });
      }
    });
  };

  const handleEdit = (shift) => {
    setFormData({
      name: shift.name,
      punchIn: shift.punchIn,
      punchOut: shift.punchOut,
    });
    setIsEditing(true);
    setEditId(shift._id);
    setShowForm(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center">
            <FiClock className="mr-2 text-indigo-600" />
            Shift Schedule
          </h1>
          <p className="text-xs text-gray-500">All scheduled shifts</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setFormData({ name: '', punchIn: '', punchOut: '' });
          }}
          className="flex items-center text-xs px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
        >
          <FiPlus className="mr-1" />
          {isEditing ? 'Cancel Edit' : 'Add Shift'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded shadow-sm space-y-2 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Shift Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border px-2 py-1 rounded text-sm"
              required
            />
            <input
              type="time"
              value={formData.punchIn}
              onChange={(e) => setFormData({ ...formData, punchIn: e.target.value })}
              className="border px-2 py-1 rounded text-sm"
              required
            />
            <input
              type="time"
              value={formData.punchOut}
              onChange={(e) => setFormData({ ...formData, punchOut: e.target.value })}
              className="border px-2 py-1 rounded text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-4 py-1 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-600"
          >
            {isEditing ? 'Update Shift' : 'Save Shift'}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-indigo-500"></div>
        </div>
      ) : isError ? (
        Swal.fire('Error', errorMessage || 'Something went wrong', 'error') && null
      ) : shifts.length === 0 ? (
        <div className="text-center p-8 bg-white border rounded shadow-sm">
          <FiWatch className="mx-auto text-gray-400" size={40} />
          <p className="text-sm text-gray-500 mt-2">No shifts scheduled</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Shift</th>
                <th className="text-left px-4 py-2 flex items-center"><FiSunrise className="mr-1" /> In</th>
                <th className="text-left px-4 py-2 flex items-center"><FiSunset className="mr-1" /> Out</th>
                <th className="text-left px-4 py-2">Duration</th>
                <th className="text-left px-4 py-2"><FiCoffee className="mr-1 inline" /> Breaks</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {shifts.map((shift, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <td className="px-4 py-2">{shift.name}</td>
                  <td className="px-4 py-2 text-gray-600">{shift.punchIn}</td>
                  <td className="px-4 py-2 text-gray-600">{shift.punchOut}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {calculateDuration(shift.punchIn, shift.punchOut)}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {shift.breaks?.length > 0 ? (
                      <ul className="space-y-1 text-xs">
                        {shift.breaks.map((brk, i) => (
                          <li key={i} className="flex items-start">
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs mr-2">{brk.type}</span>
                            <span className="font-mono">{brk.start} - {brk.end}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs text-gray-400">No breaks</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(shift)}
                      className="text-indigo-500 hover:text-indigo-700 text-xs flex items-center"
                    >
                      <FiEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(shift._id)}
                      className="text-red-500 hover:text-red-700 text-xs flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShiftDashBoard;
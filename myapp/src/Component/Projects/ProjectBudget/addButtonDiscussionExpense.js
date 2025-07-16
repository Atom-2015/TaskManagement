import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpenceDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/createExpenceDiscussionSlice';
import { getExpenseDiscussion } from '../../../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion';
import Swal from 'sweetalert2';

const AddButtonDiscussionExpense = ({ onSubmit , projectId }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    clientName: '',
    discussedBy: '',
    pending: false,
    comment: '',
    nextFollowUp: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (onSubmit) {
        onSubmit(formData);
      }
      
      await dispatch(addExpenceDiscussion({ formData, projectId }));
      
      // Success notification
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Discussion added successfully',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Reset form and refresh data
      setFormData({
        date: '',
        clientName: '',
        discussedBy: '',
        pending: false,
        comment: '',
        nextFollowUp: ''
      });
      
      setShowForm(false);
      await dispatch(getExpenseDiscussion({ projectId }));
    } catch (error) {
      // Error notification
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add discussion',
        timer: 2000,
        showConfirmButton: false
      });
      console.error('Error adding discussion:', error);
    }
  };
  return (
    <div className="p-3">
      <button
        onClick={() => setShowForm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Add Discussion
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-lg font-bold"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Discussed By</label>
                <input
                  type="text"
                  name="discussedBy"
                  value={formData.discussedBy}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="pending"
                  checked={formData.pending}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label className="font-medium">Pending</label>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Next FollowUp</label>
                <input
                  type="date"
                  name="nextFollowUp"
                  value={formData.nextFollowUp}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButtonDiscussionExpense;
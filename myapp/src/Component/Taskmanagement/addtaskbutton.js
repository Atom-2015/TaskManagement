import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtask } from '../../FeatureRedux/addtaskSlice'; // Assuming you're dispatching action here

function Addtaskbutton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskdata, setTaskdata] = useState({
    title: '',
    assigned_to: '',
    assigned_by: '',
    totalunit: '',
    unittype: '',
    due_date: '',
    project_id: '',
    project_id:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskdata((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Dispatch the addtask action here
    setTaskdata({
      project_id:localStorage.getItem('Projectid')
    })
    console.log('New Task Data:', taskdata);
    // Assuming you will dispatch to redux here
    dispatch(addtask(taskdata));

    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={toggleModal}
      >
        Add Task
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 top-40 z-50 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg mx-auto w-[90%] p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>

            {/* Form */}
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {/* Title Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskdata.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter task title"
                  />
                </div>

                {/* Assigned To Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="assigned_to">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    id="assigned_to"
                    name="assigned_to"
                    value={taskdata.assigned_to}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter person assigned to task"
                  />
                </div>

                {/* Assigned By Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="assigned_by">
                    Assigned By
                  </label>
                  <input
                    type="text"
                    id="assigned_by"
                    name="assigned_by"
                    value={taskdata.assigned_by}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter person assigning the task"
                  />
                </div>

                {/* Total Units Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="totalunit">
                    Total Units
                  </label>
                  <input
                    type="number"
                    id="totalunit"
                    name="totalunit"
                    value={taskdata.totalunit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter total units"
                  />
                </div>

                {/* Unit Type Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="unittype">
                    Unit Type
                  </label>
                  <input
                    type="text"
                    id="unittype"
                    name="unittype"
                    value={taskdata.unittype}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter unit type"
                  />
                </div>

                {/* Due Date Input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="due_date">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={taskdata.due_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Project ID Input */}
                {/* <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="project_id">
                    Project ID
                  </label>
                  <input
                    type="text"
                    id="project_id"
                    name="project_id"
                    value={taskdata.project_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter project ID"
                  />
                </div> */}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtaskbutton;

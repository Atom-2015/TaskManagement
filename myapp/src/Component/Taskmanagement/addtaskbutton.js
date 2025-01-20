import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtask } from '../../FeatureRedux/addtaskSlice'; 
import taskImage from '../Media/subtask.jpg'; // Adjust path as needed

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
    dispatch(addtask(taskdata));
    setIsModalOpen(false); 
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg p-4 w-[60%] flex shadow-[0px_0px_10px_0px_gray]">
            {/* Left Side - Image */}
            <div className=" flex justify-center items-center">
              <img src={taskImage} alt="Task" className="w-[300px] h-auto rounded-lg" />
            </div>

            {/* Right Side - Form */}
            <div className=" p-4">
              <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>

              {/* Form */}
              <form onSubmit={handleFormSubmit}>
                <div className="flex justify-between gap-4">
                  {/* Title Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={taskdata.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter task title"
                    />
                  </div>

                  {/* Assigned To Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="assigned_to">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      id="assigned_to"
                      name="assigned_to"
                      value={taskdata.assigned_to}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter assignee"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  {/* Assigned By Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="assigned_by">
                      Assigned By
                    </label>
                    <input
                      type="text"
                      id="assigned_by"
                      name="assigned_by"
                      value={taskdata.assigned_by}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter assigner"
                    />
                  </div>

                  {/* Total Units Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="totalunit">
                      Total Units
                    </label>
                    <input
                      type="number"
                      id="totalunit"
                      name="totalunit"
                      value={taskdata.totalunit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter units"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  {/* Unit Type Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="unittype">
                      Unit Type
                    </label>
                    <input
                      type="text"
                      id="unittype"
                      name="unittype"
                      value={taskdata.unittype}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter unit type"
                    />
                  </div>

                  {/* Due Date Input */}
                  <div className="mb-4 w-1/2">
                    <label className="block text-gray-300 mb-2" htmlFor="due_date">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="due_date"
                      name="due_date"
                      value={taskdata.due_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-4">
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
        </div>
      )}
    </div>
  );
}

export default Addtaskbutton;

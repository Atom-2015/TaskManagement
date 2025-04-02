import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { RxCross1 } from 'react-icons/rx'
import ReactQuill from "react-quill";
import { IoIosArrowForward } from "react-icons/io";

const ProjectViewSubTaskDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isopen, setIsopen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)


  // Get data from navigation state
  const { subtaskData, projectId, parentTaskId } = location.state || {}

  if (!subtaskData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Subtask data not found</div>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (value) => {
    if (!value) return "₹0"
    return `₹${parseInt(value).toLocaleString('en-IN')}`
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headings
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ align: [] }], // Alignment options (left, center, right, justify)
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      ["blockquote", "code-block"], // Block types
      [{ color: [] }, { background: [] }], // Text color & background

      ["clean"], // Remove formatting
    ],
  };
  // Helper functions for styling
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  const toggleOpen = () => {
    setIsopen(!isopen)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-purple-100 text-purple-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleOpening = () => {
    setIsOpening(!isOpening)
  }

  function handleDescriptionChange() {

  }

  return (
    <div className="p-2">
      <div className="bg-gray-100 rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-white px-5 py-2 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{subtaskData.subTaskName}</h1>

          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 p-6">
          {/* Left Column - Basic Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg py-3 shadow">
              <div className="flex flex-col items-start ml-5">

                <span className={`mt-1  text-sm font-medium hover:cursor-pointer ${(subtaskData.status)}`}>
                  {subtaskData.status}
                </span>
                <span className="text-gray-600 hover:cursor-default text-sm">CURRENT STATUS</span>
              </div>
            </div>

            <div className="bg-white rounded-lg py-3  ">
              {/* Description */}
              <div className="w-full p-2">
                <label className="font-semibold text-gray-700 flex items-start ">
                  <button onClick={toggleOpen}><div className='flex flex-row justify-center items-center gap-2'>Description  <IoIosArrowForward
                    className={`transition-transform duration-200 ${isopen ? 'rotate-90' : 'rotate-0'}`}
                  /></div></button></label>
                {isopen &&
                
                (
                
                  <div>
                
                <ReactQuill
                  theme="snow"
                  // Use description from state
                  onChange={handleDescriptionChange} // Ensure proper update
                  className="w-full border border-blue-300 rounded-sm"
                  modules={modules}
                />
                
                <div className='flex flex-row gap-3'>
                <button onClick={toggleOpen} className=' px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white hover:transition duration-500'>Cancel</button>
                <button className=' px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white hover:transition duration-300'>Add</button>
                  </div>

                </div>
                )
                
                }
              </div>
            </div>



            <div className="bg-white   p-6 rounded-lg ">
              {/* Heading inside the same frame */}
              <button onClick={toggleOpening} className='flex justify-start'><h2 className="text-lg font-semibold text-gray-700 border-b-2 pb-2">Sub-Task Details</h2></button>

              {(isOpening &&
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 bg-white p-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Subtask Name:</span>
                      <span className="font-medium">{subtaskData.subTaskName}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Assigned To:</span>
                      <span className="font-medium">{subtaskData.user}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Priority:</span>
                      <span className={`text-sm font-medium ${getPriorityColor(subtaskData.priority)}`}>
                        {subtaskData.priority}
                      </span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Status:</span>
                      <span className={`text-sm font-medium ${getStatusColor(subtaskData.status)}`}>
                        {subtaskData.status}
                      </span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Reminder:</span>
                      <span className="font-medium">{subtaskData.reminder || "None"}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Billing Type:</span>
                      <span className="font-medium">{subtaskData.billingType || "None"}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Start Date:</span>
                      <span className="font-medium">{subtaskData.startDate}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Due Date:</span>
                      <span className="font-medium">{subtaskData.endDate}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Duration:</span>
                      <span className="font-medium">{subtaskData.duration}</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Completion %:</span>
                      <span className="font-medium">{subtaskData.progress || 0}%</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Work Hours:</span>
                      <span className="font-medium">00:00</span>
                    </div>
                    <div className="flex border-b-[1px] border-gray-200 pb-2">
                      <span className="w-40 text-gray-600">Associated Team:</span>
                      <span className="font-medium">{subtaskData.team || "None"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div>Sub task details</div>
            
              

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectViewSubTaskDetails
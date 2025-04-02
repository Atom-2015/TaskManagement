import { Checkbox } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import GanttChart from "./GanttChart";
import AddSubTaskForm from "./AddSubTaskForm";

const ProjectViewSubTask = ({ isStandalone }) => {
  const { project, id, taskId } = useParams();
  const navigate = useNavigate();
  const [subTasks, setSubTasks] = useState([
    { id: "1", subTaskName: "Design UI Mockups", user: "John Doe", priority: "High", startDate: "2024-03-20", endDate: "2024-03-25", duration: "5 days", cost: "5000", status: "Active", checked: false },
    { id: "2", subTaskName: "Develop API Endpoints", user: "Jane Smith", priority: "Medium", startDate: "2024-03-22", endDate: "2024-03-30", duration: "8 days", cost: "8000", status: "In Progress", checked: false },
    { id: "3", subTaskName: "Write Documentation", user: "Alice Brown", priority: "Low", startDate: "2024-03-25", endDate: "2024-04-01", duration: "7 days", cost: "3000", status: "Completed", checked: false }
  ]);

  const [newSubTask, setNewSubTask] = useState({
    subTaskName: "",
    user: "",
    priority: "Medium",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    duration: "7 days",
    cost: "",
    status: "Active",
    checked: false
  });

  const [editingTask, setEditingTask] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [showFullAddForm, setShowFullAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openSubTask,setOpenSubTask]=useState(false)

  const calculateDuration = (start, end) => {
    if (!start || !end) return "0 days";

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime())) return "Invalid start date";
    if (isNaN(endDate.getTime())) return "Invalid end date";
    if (endDate < startDate) return "Invalid date range";

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const handleAddSubTask = () => {
    if (!newSubTask.subTaskName.trim()) return;

    const duration = calculateDuration(newSubTask.startDate, newSubTask.endDate);

    const newTask = {
      id: `sub-${Date.now()}`,
      ...newSubTask,
      duration,
      cost: newSubTask.cost || "0"
    };

    setSubTasks([...subTasks, newTask]);
    resetNewSubTask();
    setShowFullAddForm(false);
    inputRef.current?.focus();
  };

  const handleTable = () => {
    setOpen(!open)
  }

  const resetNewSubTask = () => {
    const defaultStart = new Date().toISOString().split('T')[0];
    const defaultEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    setNewSubTask({
      subTaskName: "",
      user: "",
      priority: "Medium",
      startDate: defaultStart,
      endDate: defaultEnd,
      duration: calculateDuration(defaultStart, defaultEnd),
      cost: "",
      status: "Active",
      checked: false
    });
  };

  const handleFieldChange = (field, value) => {
    const updatedTask = {
      ...newSubTask,
      [field]: value
    };

    if (field === 'startDate' || field === 'endDate') {
      updatedTask.duration = calculateDuration(
        field === 'startDate' ? value : newSubTask.startDate,
        field === 'endDate' ? value : newSubTask.endDate
      );
    }

    setNewSubTask(updatedTask);
  };

  const handleUpdateTask = (taskId, field, value) => {
    setSubTasks(subTasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, [field]: value };

        if (field === 'startDate' || field === 'endDate') {
          updatedTask.duration = calculateDuration(
            field === 'startDate' ? value : task.startDate,
            field === 'endDate' ? value : task.endDate
          );
        }

        return updatedTask;
      }
      return task;
    }));
    setEditingTask(null);
    setEditingField(null);
  };

  const toggleCheckbox = (taskId) => {
    setSubTasks(subTasks.map(task => {
      if (task.id === taskId) {
        const newCheckedState = !task.checked;
        if (newCheckedState) {
          setSelectedTask(taskId);
        } else {
          setSelectedTask(null);
        }
        return { ...task, checked: newCheckedState };
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    setSubTasks(subTasks.filter(task => task.id !== taskId));
    setSelectedTask(null);
  };

  const handleKeyDown = (e, taskId, field) => {
    if (e.key === 'Enter') {
      if (taskId) {
        handleUpdateTask(taskId, field, e.target.value);
      } else {
        if (!showFullAddForm && newSubTask.subTaskName.trim()) {
          setShowFullAddForm(true);
        } else {
          handleAddSubTask();
        }
      }
    } else if (e.key === 'Escape') {
      setEditingTask(null);
      setEditingField(null);
      if (showFullAddForm) {
        setShowFullAddForm(false);
      }
    }
  };

  const [edittask, setEdittask] = useState(false)

  const handleSingleClick = (taskId, field) => {
    setEditingTask(taskId);
    setEditingField(field);
  };

  const formatCurrency = (value) => {
    if (!value) return "₹0";
    return `₹${parseInt(value).toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full bg-white h-full p-2">
      <div className="overflow-x-auto">
        {isStandalone && (
          <div className="flex flex-row justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">SubTasks</h2>
            <button className="p-1 px-2"><AddSubTaskForm/></button>
            <button
              className="hover:rotate-180 transition duration-700"
              onClick={() => navigate(-1)}
            >
              <RxCross1 size={18} />
            </button>
          </div>
        )}

        <DragDropContext onDragEnd={() => { }}>
          <Droppable droppableId="subTasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="w-full">
                <table className="w-full border-collapse border border-gray-300 table-fixed">
                  <colgroup>
                    <col className="w-10" /> {/* Checkbox */}
                    <col className="w-16" /> {/* ID */}
                    <col className="w-48" /> {/* Sub Task */}
                    <col className="w-32" /> {/* Assigned */}
                    <col className="w-24" /> {/* Priority */}
                    <col className="w-24" /> {/* Start */}
                    <col className="w-24" /> {/* End */}
                    <col className="w-24" /> {/* Duration */}
                    <col className="w-32" /> {/* Cost */}
                    <col className="w-24" /> {/* Status */}
                  </colgroup>
                  <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2"></th>
                      {["ID", "Sub Task", "Assigned", "Checklist", "Priority", "Start", "End", "Duration", "Cost", "Status", "Work Chart"].map((col, index) => (
                        <th
                          key={index}
                          className="border border-gray-300 p-2 text-center text-sm font-medium text-gray-700"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <React.Fragment>
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white hover:bg-gray-50 border border-gray-300 ${task.checked ? 'bg-blue-50' : ''}`}
                            >
                              <td className="border border-gray-300 p-2 text-center">
                                <div
                                  className={`w-4 h-4 border border-gray-400 flex items-center justify-center cursor-pointer transition-colors mx-auto ${task.checked ? 'bg-blue-500 border-blue-500' : 'bg-white'
                                    }`}
                                  onClick={() => toggleCheckbox(task.id)}
                                >
                                  {task.checked && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </td>
                              <td
                                className="border border-gray-300 p-2 text-sm text-gray-500 text-center hover:cursor-move"
                                {...provided.dragHandleProps}
                              >
                                ST-{index + 1}
                              </td>
                              {/* <td
                                className="border border-gray-300 p-2 text-sm font-semibold text-center overflow-hidden"
                                onClick={() => handleSingleClick(task.id, 'subTaskName')}
                              > */}
                              <td className="border bg-white border-gray-300 p-2 text-start relative group">
                                <div
                                  className="flex items-center justify-between w-full min-h-[40px] relative"
                                  onMouseEnter={(e) => e.currentTarget.querySelector('button').classList.replace('opacity-0', 'opacity-100')}
                                  onMouseLeave={(e) => e.currentTarget.querySelector('button').classList.replace('opacity-100', 'opacity-0')}
                                >
                                  {/* Task Name */}
                                  <div className="flex-1 truncate pr-2">
                                    {editingTask === task.id && editingField === 'subTaskName' ? (
                                      <input
                                        type="text"
                                        defaultValue={task.subTaskName}
                                        onBlur={(e) => handleUpdateTask(task.id, 'subTaskName', e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, task.id, 'subTaskName')}
                                        className="w-full p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                        autoFocus
                                      />
                                    ) : (
                                      <span className="block truncate">{task.subTaskName}</span>
                                    )}
                                  </div>

                                  {/* View Project Button */}
                                  <button
  className="px-2 py-1 text-sm font-medium rounded-lg transition-opacity duration-200
             border-2 border-purple-600 text-purple-600 hover:bg-purple-50
             opacity-0 group-hover:opacity-100 absolute right-0"
  onClick={() => navigate(`/project/${id}/subtask/${task.id}/subtaskwithin/View`, { 
    state: { 
      subtaskData: task,
      projectId: id,
      parentTaskId: taskId
    } 
  })}
>
  View Project
</button>
                                </div>
                              </td>

                              <td
                                className="border border-gray-300 p-2 text-sm text-center overflow-hidden"
                                onClick={() => handleSingleClick(task.id, 'user')}
                              >
                                {editingTask === task.id && editingField === 'user' ? (
                                  <input
                                    type="text"
                                    defaultValue={task.user}
                                    onBlur={(e) => handleUpdateTask(task.id, 'user', e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, task.id, 'user')}
                                    className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                  />
                                ) : (
                                  <span className="block truncate">{task.user}</span>
                                )}
                              </td>
                              <td>
                                <div>
                                  <label>
                                    <input type="checkbox" checked={open} onChange={handleTable} />

                                  </label>

                                  {open && (
                                    <div className="absolute top-10 left-0 z-50 bg-white shadow-lg p-4 border border-gray-300">
                                      <div className="flex flex-row justify-between">
                                        <div className="flex text-2xl font-bold">
                                          Ckeck-List
                                        </div>

                                        <div className="flex ">
                                          <button className="" onClick={() => setOpen(false)}>
                                            <RxCross2 size={30} />
                                          </button>
                                        </div>
                                      </div>

                                      <form>
                                        <table className="mt-4 border-collapse border border-gray-400 w-full">
                                          <thead>
                                            <tr className="bg-gray-200">
                                              <th className="border p-2">Item</th>
                                              <th className="border p-2">To-Check</th>
                                              <th className="border p-2">Confirm</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="Picture" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="text" defaultValue="No-Blur" />
                                              </td>
                                              <td className="border p-2">
                                                <input type="checkbox" defaultValue="" />
                                              </td>
                                            </tr>

                                          </tbody>
                                        </table>
                                        <div className="flex gap-6">
                                          <button type="submit" className="mt-2 p-2 bg-blue-500 rounded text-white">
                                            Submit
                                          </button>
                                          <button type="" className="mt-2 p-2 bg-blue-500 rounded text-white">
                                            Add More
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                </div>
                              </td>
                              <td
                                className={`border border-gray-300 p-2 text-sm text-center relative ${task.priority === "High" ? "bg-red-500 text-white" :
                                  task.priority === "Medium" ? "bg-green-500 text-white" :
                                    "bg-blue-500 text-white"
                                  }`}
                                onClick={() => {
                                  setEdittask(true)
                                  // setEditingTask(task.id);
                                  // setEditingField('priority');

                                }}
                              >
                                {edittask ? (
                                  <select
                                    defaultValue={task.priority}
                                    onChange={(e) => handleUpdateTask(task.id, 'priority', e.target.value)}
                                    className="absolute left-0 top-0 w-full h-full text-center appearance-none bg-transparent focus:ring-0 focus:outline-none"
                                    autoFocus
                                    onBlur={() => {

                                      setEditingTask(null);
                                      setEditingField(null);
                                    }}
                                  >
                                    <option className="text-black bg-white" value="High">High</option>
                                    <option className="text-black bg-white" value="Medium">Medium</option>
                                    <option className="text-black bg-white" value="Low">Low</option>
                                  </select>
                                ) : (
                                  task.priority
                                )}
                              </td>
                              <td
                                className="border border-gray-300 p-2 text-sm text-center"
                                onClick={() => handleSingleClick(task.id, 'startDate')}
                              >
                                {editingTask === task.id && editingField === 'startDate' ? (
                                  <input
                                    type="date"
                                    defaultValue={task.startDate}
                                    onChange={(e) => handleUpdateTask(task.id, 'startDate', e.target.value)}
                                    className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                  />
                                ) : (
                                  task.startDate
                                )}
                              </td>
                              <td
                                className="border border-gray-300 p-2 text-sm text-center"
                                onClick={() => handleSingleClick(task.id, 'endDate')}
                              >
                                {editingTask === task.id && editingField === 'endDate' ? (
                                  <input
                                    type="date"
                                    defaultValue={task.endDate}
                                    onChange={(e) => handleUpdateTask(task.id, 'endDate', e.target.value)}
                                    className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                  />
                                ) : (
                                  task.endDate
                                )}
                              </td>
                              <td className="border border-gray-300 p-2 text-sm text-center">
                                {task.duration}
                              </td>
                              <td
                                className="border border-gray-300 p-2 text-sm text-center"
                                onClick={() => handleSingleClick(task.id, 'cost')}
                              >
                                {editingTask === task.id && editingField === 'cost' ? (
                                  <div className="flex justify-center items-center">
                                    <span className="mr-1">₹</span>
                                    <input
                                      type="number"
                                      defaultValue={task.cost}
                                      onBlur={(e) => handleUpdateTask(task.id, 'cost', e.target.value)}
                                      onKeyDown={(e) => handleKeyDown(e, task.id, 'cost')}
                                      className="w-20 text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                      autoFocus
                                    />
                                  </div>
                                ) : (
                                  formatCurrency(task.cost)
                                )}
                              </td>
                              <td
                                className={`border border-gray-300 p-2 text-sm text-center relative ${task.status === "Active" ? "bg-green-500 text-white" :
                                  task.status === "In Progress" ? "bg-yellow-500 text-black" :
                                    "bg-red-500 text-white"
                                  }`}
                                onClick={() => {
                                  if (editingTask !== task.id || editingField !== 'status') {
                                    setEditingTask(task.id);
                                    setEditingField('status');
                                  }
                                }}
                              >
                                {editingTask === task.id && editingField === 'status' ? (
                                  <select
                                    defaultValue={task.status}
                                    onChange={(e) => handleUpdateTask(task.id, 'status', e.target.value)}
                                    className="absolute left-0 top-0 w-full h-full text-center appearance-none bg-transparent focus:ring-0 focus:outline-none"
                                    autoFocus
                                    onBlur={() => {
                                      setEditingTask(null);
                                      setEditingField(null);
                                    }}
                                  >
                                    <option className="text-black bg-white" value="Active">Active</option>
                                    <option className="text-black bg-white" value="In Progress">In Progress</option>
                                    <option className="text-black bg-white" value="Completed">Completed</option>
                                  </select>
                                ) : (
                                  task.status
                                )}
                              </td>

                              <style>{`
  .scrollable-gantt {
    overflow-x: auto;
    max-width: 200px; /* Adjust as needed */
    white-space: nowrap;
  }
  .gantt-container {
    display: inline-block;
    min-width: 100%;
  }
`}</style>


                              {/* Work Chart Column - Replace with Gantt Calendar */}
                              <td className="border p-1">
                                <div style={{ width: '500px', overflowX: 'auto' }}>
                                  <GanttChart
                                    duration={task.duration}
                                    startDate={task.startDate}
                                    endDate={task.endDate}
                                  />
                                </div>
                              </td>





                            </tr>

                            {task.checked && (
                              <tr className="bg-blue-50">
                                <td colSpan="10" className="border border-gray-300 p-2">
                                  <div className="flex justify-center space-x-2">
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('user');
                                      }}
                                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                    >
                                      Assign
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('startDate');
                                      }}
                                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                                    >
                                      Start Date
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('endDate');
                                      }}
                                      className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
                                    >
                                      End Date
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('status');
                                      }}
                                      className="px-2 py-1 bg-yellow-500 text-black text-xs rounded hover:bg-yellow-600"
                                    >
                                      Status
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('priority');
                                      }}
                                      className="px-2 py-1 bg-indigo-500 w-[40px] text-white text-xs rounded hover:bg-indigo-600"
                                    >
                                      Priority
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField('cost');
                                      }}
                                      className="px-2 py-1 bg-teal-500 text-white text-xs rounded hover:bg-teal-600"
                                    >
                                      Cost
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )}
                      </Draggable>
                    ))}

                    {/* Add New Task Row */}
                    <tr className="border border-gray-300 bg-gray-50">
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2 text-sm text-gray-500 text-center">
                        ST-{subTasks.length + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newSubTask.subTaskName}
                          onChange={(e) => handleFieldChange('subTaskName', e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="+ Add Sub Task (press Enter)"
                          className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                        />
                      </td>
                      {showFullAddForm ? (
                        <>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="text"
                              value={newSubTask.user}
                              onChange={(e) => handleFieldChange('user', e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Assignee"
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <select
                              value={newSubTask.priority}
                              onChange={(e) => handleFieldChange('priority', e.target.value)}
                              className="w-full text-center p-2 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            >
                              <option className="w-full text-black" value="High">High</option>
                              <option className="w-full text-black" value="Medium">Medium</option>
                              <option className="w-full text-black" value="Low">Low</option>
                            </select>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              value={newSubTask.startDate}
                              onChange={(e) => handleFieldChange('startDate', e.target.value)}
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              value={newSubTask.endDate}
                              onChange={(e) => handleFieldChange('endDate', e.target.value)}
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </td>
                          <td className="border border-gray-300 p-2 text-sm text-center">
                            {newSubTask.duration}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <div className="flex justify-center items-center">
                              <span className="mr-1">₹</span>
                              <input
                                type="number"
                                value={newSubTask.cost}
                                onChange={(e) => handleFieldChange('cost', e.target.value)}
                                className="w-20 text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                placeholder="0"
                              />
                            </div>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <select
                              value={newSubTask.status}
                              onChange={(e) => handleFieldChange('status', e.target.value)}
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            >
                              <option value="Active">Active</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <td colSpan={7} className="border border-gray-300 p-2 text-sm">
                          {/* Empty cells when form is collapsed */}
                        </td>
                      )}
                    </tr>

                    {provided.placeholder}
                  </tbody>
                </table>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectViewSubTask;
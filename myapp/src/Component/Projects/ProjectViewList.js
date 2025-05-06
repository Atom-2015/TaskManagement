import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { projectdetails } from "../../FeatureRedux/projectSlice/detailproject";
import { addtask } from "../../FeatureRedux/task/addtaskSlice";
import AddTaskForm1 from "./AddTaskForm1";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RxCross1 } from "react-icons/rx";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import ProjectViewSubTask from "./ProjectViewSubTask";
import AddTaskForm from "./AddTaskForm";

const ProjectViewList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projectdetails);
  const [showTask, setShowTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showFullAddForm, setShowFullAddForm] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [expandedSubTaskId, setExpandedSubTaskId] = useState(null);
  const [columnWidths, setColumnWidths] = useState([
    30, 50, 250, 150, 150, 120, 120, 120,120
  ]);
  const [newSubTask, setNewSubTask] = useState({
    title: "",
    loop_users: "",
    status: "Active",
    priority: "Medium",
    end_date:"",

    category: "",
    repeatType: "",
  });
  const [activeTaskId, setActiveTaskId] = useState(null);
  const isResizing = useRef(false);
  const columnIndexRef = useRef(null);
  const startX = useRef(0);

  useEffect(() => {
    dispatch(projectdetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (projects.task) {
      setTasks(
        (projects.task?.tasks || []).map((task, index) => ({
          ...task,
          id: task._id || `temp-${index}`,
          subTasks: task.subTasks || [],
          showAddSubTask: false,
        }))
      );
    }
  }, [projects.task]);

  const handleAddTaskSubmit = (projectId, newTask) => {
    dispatch(addtask({ projectId, task: newTask }));
  };

  const handleToggleExpand = (taskId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleQuickAddSubmit = (e) => {
    e.preventDefault();
    
    if (!newSubTask.title.trim() && !showFullAddForm) {
      setShowFullAddForm(true);
      return;
    }
  
    // Ensure proper data structure matching your API expectations
    const taskToAdd = {
      name: newSubTask.title || "", 
      taskAssign: "", // Explicit empty string
      description: "", // Explicit empty string
      loopUsers: newSubTask.loop_users ? [newSubTask.loop_users] : [], // Array format
      status: newSubTask.status || "Active",
      priority: newSubTask.priority || "Medium",
      category: newSubTask.category || "",
      repeatType: newSubTask.repeatType || "Daily",
      start_date: "", // Explicit empty
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[1],
      state: "", // Explicit empty
      city: "", // Explicit empty
      budget: "", // Explicit empty
      repeat: [], // Empty array
      repeatDays: [], // Empty array
      repeatWeeks: [], // Empty array
      repeatMonths: [] // Empty array
    };
  
    dispatch(addtask({ data: taskToAdd, id}))

    .then(() => {
      // Reset form
      setNewSubTask({
        title: "",
        loop_users: "",
        status: "Active",
        priority: "Medium",
        category: "",
        end_date:"",

        repeatType: "",
      });
      setShowFullAddForm(false);
      dispatch(projectdetails(id)); // Refresh data
    })
    .catch(error => {
      console.error("Add task error:", error);
    });
  };

  const handleToggleSubTask = (taskId) => {
    console.log(`this is task id ${taskId}`);
    setExpandedSubTaskId(expandedSubTaskId === taskId ? null : taskId);
  };

  const handleViewTask = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);
    setTasks(newTasks);
  };

  const handleBack = () => {
    setTimeout(() => {
      navigate(-1);
    }, 200);
  };

  const handleViewSubTask = (taskId) => {
    navigate(`/project/${id}/task/${taskId}`);
  };

  const handleAddSubTask = (taskId) => {
    if (!newSubTask.title.trim()) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newSubTaskItem = {
          id: `sub-${Date.now()}`,
          ...newSubTask,
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          duration: "7 days",
          status: "Active",
        };
        return {
          ...task,
          subTasks: [...(task.subTasks || []), newSubTaskItem],
          showAddSubTask: false,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setNewSubTask({
      title: "",
      loop_users: "",
      status: "Pending",
      priority: "Medium",
      category: "",
      repeatType: "",
      end_date:"",

    });
  };

  const toggleAddSubTask = (taskId) => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        showAddSubTask: task.id === taskId ? !task.showAddSubTask : false,
      }))
    );
  };

  const handleSubTaskFieldChange = (field, value) => {
    setNewSubTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMouseDown = (index, event) => {
    isResizing.current = true;
    columnIndexRef.current = index;
    startX.current = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (!isResizing.current) return;
    const diffX = event.clientX - startX.current;
    setColumnWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[columnIndexRef.current] = Math.max(
        50,
        prevWidths[columnIndexRef.current] + diffX
      );
      return newWidths;
    });
    startX.current = event.clientX;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-auto max-h-[100vh] flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-4">Task Details</h1>
          <div className="flex justify-end mb-2">
            <button
              className="font-extrabold mb-8 hover:rotate-180 transition duration-700"
              onClick={handleBack}
            >
              <RxCross1 className="font-extrabold" size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowTask(true)}
            className="p-1 border border-blue-500 bg-blue-700 rounded-lg px-2 hover:bg-slate-500 transform duration-300 hover:shadow-[0_4px_4px_#1976D2] text-white"
          >
            ADD TASK
          </button>
        </div>

        {showTask && (
          <AddTaskForm
            projectId={id}
            onSubmit={handleAddTaskSubmit}
            onCancel={() => setShowTask(false)}
          />
        )}

        <div className="relative flex-1 overflow-y-auto flex flex-col">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 overflow-y-auto "
                >
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="unset top-0 z-10 ">
                      <tr className="border-gray-300">
                        <th
                          style={{ width: columnWidths[0] }}
                          className="border  border-gray-300 p-2"
                        >
                          ▼
                        </th>

                        {[
                          "ID",
                          "Task Title",
                          "loop_users",
                          "Task Status",
                          "Task Priority",
                          // "category",
                          "End date",
                          "Repeat",
                        ].map((col, index) => (
                          <th
                            key={index}
                            style={{ width: columnWidths[index + 1] }}
                            className="border  border-gray-300 p-2 relative group"
                          >
                            {col}
                            <div
                              onMouseDown={(e) => handleMouseDown(index + 1, e)}
                              className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                            ></div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {tasks.map((task, index) => (
                        <React.Fragment key={task.id}>
                          {/* Parent Task Row */}
                          {console.log(`okay brio ${JSON.stringify(task)}`)}
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <>
                                <tr
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`transition-all duration-200 draggable-row ${
                                    snapshot.isDragging
                                      ? "bg-blue-100 shadow-lg border-2 border-blue-400"
                                      : "hover:bg-gray-50 border border-gray-300"
                                  }`}
                                  style={{
                                    ...provided.draggableProps.style,
                                    display: "table-row",
                                    width: "100%",
                                    position: "static",
                                    zIndex: snapshot.isDragging ? 1000 : 0,
                                  }}
                                >
                                  <td className="border bg-white border-gray-50 p-1 text-center">
                                    <button
                                      onClick={() =>
                                        handleToggleSubTask(task.id)
                                      }
                                      className="text-black hover:text-gray-600 transition-transform duration-200"
                                    >
                                      {expandedSubTaskId === task.id ? (
                                        <MdKeyboardArrowDown
                                          size={20}
                                          className="transform transition-transform duration-200"
                                        />
                                      ) : (
                                        <MdKeyboardArrowRight
                                          size={20}
                                          className="transform transition-transform duration-200"
                                        />
                                      )}
                                    </button>
                                  </td>
                                  <td
                                    className="border bg-white border-gray-50 p-1 w-3 text-center hover:cursor-move"
                                    {...provided.dragHandleProps}
                                  >
                                    ER-{index + 1}
                                  </td>
                                  <td className="border bg-white border-gray-50 p-1 text-start relative font-semibold">
                                    <div
                                      className="flex justify-between items-center cursor-pointer whitespace-nowrap relative"
                                      onMouseEnter={(e) =>
                                        e.currentTarget
                                          .querySelector("button")
                                          .classList.add("opacity-100")
                                      }
                                      onMouseLeave={(e) =>
                                        e.currentTarget
                                          .querySelector("button")
                                          .classList.remove("opacity-100")
                                      }
                                    >
                                      <span className="flex-1 truncate">
                                        {task.name}
                                      </span>

                                      <button
                                        onClick={() =>
                                          handleViewSubTask(task.id)
                                        }
                                        className="absolute right-0 px-2 text-sm ml-2 text-blue-600 border-2 border-purple-600 rounded-lg opacity-0 transition-opacity duration-200"
                                      >
                                        <span>View Task</span>
                                      </button>
                                    </div>
                                  </td>
                                  <td className="border bg-white border-gray-50 p-1 text-center">
                                    {task.loop_users}
                                  </td>
                                  <td className="border bg-white border-gray-50 p-1 text-center">
                                    {task.status}
                                  </td>
                                  <td
                                    className={`border border-gray-50 p-1 text-center ${
                                      task.priority === "High"
                                        ? "bg-red-500 text-white"
                                        : task.priority === "Medium"
                                        ? "bg-green-500 text-white"
                                        : task.priority === "Low"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                    }`}
                                  >
                                    {task.priority || "Not Set"}
                                  </td>
                                  {/* <td className="border bg-white border-gray-50 p-1 text-center">
                                    {task.category}
                                  </td> */}

                                  <td className="border bg-white border-gray-50 p-1 text-center">
                                    {task.end_date}
                                  </td>

                                  <td className="border bg-white border-gray-50 p-1 text-center">
                                    {task.repeatType}
                                  </td>
                                </tr>

                                {/* Subtask Dropdown */}
                                {expandedSubTaskId === task.id && (
                                  <tr className="bg-gray-50">
                                    <td
                                      colSpan={8}
                                      className="p-0 border border-gray-300"
                                    >
                                      <div className="transition-all duration-300 ease-in-out overflow-hidden">
                                        <div className=" border-t border-gray-200">
                                          <ProjectViewSubTask
                                            taskid2={expandedSubTaskId}
                                            isStandalone={false}
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}

                                {/* Subtask Rows */}
                                {expandedRows[task.id] &&
                                  task.subTasks?.map((subTask, subIndex) => (
                                    <tr
                                      key={subTask.id}
                                      className="border border-gray-300 bg-gray-100"
                                    >
                                      <td></td>
                                      <td className="p-1 text-center">
                                        {index + 1}.{subIndex + 1}
                                      </td>
                                      <td className="p-1 text-left pl-8">
                                        {subTask.title}
                                      </td>
                                      <td className="p-1 text-center">
                                        {subTask.loop_users}
                                      </td>
                                      <td className="p-1 text-center">
                                        {subTask.status}
                                      </td>
                                      <td
                                        className={`p-1 text-center rounded-lg ${
                                          subTask.priority === "High"
                                            ? "bg-red-500 text-white"
                                            : subTask.priority === "Medium"
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 text-white"
                                        }`}
                                      >
                                        {subTask.priority}
                                      </td>
                                      {/* <td className="p-1 text-center">
                                        {subTask.category}
                                      </td> */}
                                      
                                      <td className="p-1 text-center">
                                        {subTask.repeatType}
                                      </td>
                                      
                                 
                                    </tr>
                                  ))}

                                {/* Add Sub Task Button */}
                                {expandedRows[task.id] &&
                                  !task.showAddSubTask && (
                                    <tr className="border border-gray-300 bg-gray-50">
                                      <td colSpan={8} className="p-2">
                                        <button
                                          onClick={() =>
                                            toggleAddSubTask(task.id)
                                          }
                                          className="w-full p-2 text-left text-blue-500 hover:bg-blue-50 rounded"
                                        >
                                          + Add Sub Task
                                        </button>
                                      </td>
                                    </tr>
                                  )}

                                {/* Add Sub Task Form */}
                                {expandedRows[task.id] &&
                                  task.showAddSubTask && (
                                    <tr className="border border-gray-300 bg-blue-50">
                                      <td colSpan={8} className="">
                                        <div className="grid grid-cols-8  items-center">
                                          <div className="col-span-2">
                                            <input
                                              type="text"
                                              value={newSubTask.title}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "title",
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Sub Task Name"
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div>
                                            <input
                                              type="text"
                                              value={newSubTask.loop_users}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "loop_users",
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Assigned To"
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div>
                                            <select
                                              value={newSubTask.status}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "status",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="Pending">
                                                Pending
                                              </option>
                                              <option value="In Progress">
                                                In Progress
                                              </option>
                                              <option value="Completed">
                                                Completed
                                              </option>
                                            </select>
                                          </div>
                                          <div>
                                            <select
                                              value={newSubTask.priority}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "priority",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="High">High</option>
                                              <option value="Medium">
                                                Medium
                                              </option>
                                              <option value="Low">Low</option>
                                            </select>
                                          </div>
                                          <div>
                                            <input
                                              type="text"
                                              value={newSubTask.category}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "category",
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Category"
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                          </div>
                                          <div>
                                            <select
                                              value={newSubTask.repeatType}
                                              onChange={(e) =>
                                                handleSubTaskFieldChange(
                                                  "repeatType",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="">None</option>
                                              <option value="Daily">
                                                Daily
                                              </option>
                                              <option value="Weekly">
                                                Weekly
                                              </option>
                                              <option value="Monthly">
                                                Monthly
                                              </option>
                                            </select>
                                          </div>
                                          <div className="flex gap-2">
                                            <button
                                              onClick={() =>
                                                handleAddSubTask(task.id)
                                              }
                                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                                            >
                                              Add
                                            </button>
                                            <button
                                              onClick={() =>
                                                toggleAddSubTask(task.id)
                                              }
                                              className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition-colors"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                              </>
                            )}
                          </Draggable>
                        </React.Fragment>
                      ))}
                      <tr className="border border-gray-300 bg-gray-50">
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2 text-sm text-gray-500 text-center">
                          
                        </td>
                        <td className="border border-gray-300 p-2">
                          <form onSubmit={handleQuickAddSubmit}>
                            <input
                              type="text"
                              
                              value={newSubTask.title}
                              onChange={(e)=>handleSubTaskFieldChange("title",e.target.value)}
                              placeholder="+ Add Task (Press Enter)"
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </form>
                        </td>
                      { showFullAddForm ?(
                        <>
                        <td className="border border-gray-300 px-1">
                          <input
                            type="text"
                            value={newSubTask.loop_users}
                            onChange={(e)=>handleSubTaskFieldChange("loop_users",e.target.value)}
                            placeholder="loop_user"
                            className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
        <select
          value={newSubTask.status}
          onChange={(e) => handleSubTaskFieldChange("status", e.target.value)}
          className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </td>
                        <td className="border border-gray-300 p-2">
                          <select
                            value={newSubTask.priority}
                            onChange={(e)=>handleSubTaskFieldChange("priority",e.target.value)}
                            placeholder="task priority"
                            className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                          >
                            <option className="w-full text-black" value="High">
                              High
                            </option>
                            <option
                              className="w-full text-black"
                              value="Medium"
                            >
                              Medium
                            </option>
                            <option className="w-full text-black" value="Low">
                              Low
                            </option>
                          </select>
                        </td>

                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            placeholder="category"
                            value={newSubTask.category}
                            onChange={(e) => handleSubTaskFieldChange("category", e.target.value)}
                            className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                          />
                        </td>
                        <td>
                        <select
          value={newSubTask.repeatType}
          onChange={(e) => handleSubTaskFieldChange("repeatType", e.target.value)}
          className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
        >
          <option value="">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
                        </td>
                        </>
                        ):(
                          <td colSpan={5}> </td>
                        ) }
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
    </div>
  );
};

export default ProjectViewList;

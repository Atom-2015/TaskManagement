import { Checkbox } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import GanttChart from "./GanttChart";
import AddSubTaskForm from "./AddSubTaskForm";
import { getsubtasklist } from "../../FeatureRedux/subTaskSlices/getsubtaskslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editsubtasklist } from "../../FeatureRedux/subTaskSlices/editusbTaskslice";
import { allUser } from "../../FeatureRedux/alluserSlice";
import { subcreatetasks } from "../../FeatureRedux/subTaskSlices/addsubTaskslice";
import { deleteSubtask } from "../../FeatureRedux/subTaskSlices/deletesubTaskslice";
import Cookies from "js-cookie";
// import "./table.css";

import Swal from "sweetalert2";
import { data } from "autoprefixer";
import { reorderSubtask } from "../../FeatureRedux/subTaskSlices/reorderSubtaskSlice";

const ProjectViewSubTask = ({ isStandalone, taskid2 }) => {
  var { project, id, taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingTask, setEditingTask] = useState(null);
  const [openChecklistTaskId, setOpenChecklistTaskId] = useState(null);

  const [editingField, setEditingField] = useState(null);
  const [showFullAddForm, setShowFullAddForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openSubTask, setOpenSubTask] = useState(false);
  const [edittask, setEdittask] = useState(false);
  const [tempDate, setTempDate] = useState("");
  const [rows, setRows] = useState([
    { item: "Picture", toCheck: "No-Blur", confirmed: false },
  ]);



  // State for column widths
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 50,
    id: 80,
    subTask: 300,
    assigned: 150,
    checklist: 100,
    priority: 100,
    startDate: 120,
    endDate: 120,
    duration: 100,
    cost: 120,
    status: 120,
    dateColumns: 200,
  });

  // State for resizing
  const [resizing, setResizing] = useState({
    isResizing: false,
    column: null,
    startX: 0,
    startWidth: 0,
  });

  if (!taskId) {
    taskId = taskid2;
    console.log(" No Task ID found!");
  } else {
    console.log("Task ID received:", taskId);
  }

  // redux ka data lene keliyer
  const {
    data: apiSubtasks,
    isError,
    isLoading,
    errorMessage,
  } = useSelector((state) => state.getsubtasklist);
  // console.log(`data  task } ,,,,,,, api subtask ${JSON.stringify(apiSubtasks)}`)
  // console.log(`okay ye hai subtask"(${JSON.stringify(apiSubtasks , null ,

  //   " "
  // )}`)

  //user check kar if keliye
  const users = useSelector((state) => state.allUser.users);
  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(reorderSubtask)
  },[])

  const rearrange = useSelector((state) => state.reorderSubtask)

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    // Create a new array with updated positions
    const reorderedTasks = Array.from(subTasks);
    const [movedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedItem);
  
    // Update local state immediately with new positions
    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      position: index, // Update position based on new order
    }));
  
    setSubTasks(updatedTasks);
  
    try {
      // Prepare payload for API
      const orderedSubtasks = updatedTasks.map((task,index) => ({
        id: task.id,
        order: index, // Use 'position' for the order
      }));
  
      // Dispatch the reorder action to update the backend
      const response = await dispatch(reorderSubtask(orderedSubtasks));
  
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Subtasks reordered successfully",{
          autoClose:1000,
        });
      
        const result = await dispatch(getsubtasklist({ taskId }));
        if (result?.payload?.data) {
          const sorted = [...result.payload.data].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
          const transformed = transformApiData({ data: sorted });
          setSubTasks(transformed); // 👈 this ensures cost and other fields are reprocessed
        }
      } else {
        setSubTasks(apiSubtasks ? transformApiData(apiSubtasks) : []);
        toast.error("Failed to save new order");
      }
      
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Failed to save new order");
      // Revert to original order if API fails
      setSubTasks(apiSubtasks ? transformApiData(apiSubtasks) : []);
    }
  };
  
  

  const getusername = (id, users) => {
    const found = users.find((user) => user._id === id);
    return found ? found.name : "unknown name";
  };

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



  const handletableChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Transsiton api keliyer
  const transformApiData = (apiData) => {
    if (!apiData?.data) return [];

    return apiData.data.map((task) => {
      const startDate = task.start_date || new Date().toISOString();
      let endDate = "";

      if (Array.isArray(task.end_date)) {
        const validEntry = task.end_date
          .slice() // copy
          .reverse()
          .find((entry) => entry?.value && !isNaN(new Date(entry.value)));

        endDate = validEntry
          ? new Date(validEntry.value).toISOString()
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      } else {
        endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      }

      const costArray = task.cost || [];
      const latestCost = costArray.length > 0 ? costArray[costArray.length - 1].value : 0
      const formattedCost = parseInt(latestCost).toFixed(2);

      return {
        id: task._id,
        subTaskName: task.name || "Untitled",
        user: (task.assigned_userid || [])
          .map((id) => getusername(id, users))
          .join(", ") || "Unassigned",
        priority: task.priority || "Medium",
        startDate: startDate.split("T")[0],
        endDate: endDate.split("T")[0],
        duration: calculateDuration(startDate, endDate),
        cost: formattedCost,
        status: task.status || "Active",
        checklist: Array.isArray(task.checklist)
          ? task.checklist.map((item) => ({
            item: item?.item || "",
            toCheck: item?.toCheck || "",
            checked: !!item?.checked,
          }))
          : [],
        checked: false,
      };
    });
  };

  const [subTasks, setSubTasks] = useState([]);

  // Fetch data when copnentc need it
  useEffect(() => {
    if (taskId) {
      Cookies.set("taskidlogtrail", taskId)
      // console.log(`task id in componet ${taskId}`);
      dispatch(getsubtasklist({ taskId }));
    }
  }, [taskId, dispatch]);

  // Update local state when needed
  // useEffect(() => {
  //   if (apiSubtasks) {

  //     const transformedData = transformApiData(apiSubtasks);
  //     setSubTasks(transformedData.reverse());
  //   }
  // }, [apiSubtasks, users]);

  useEffect(() => {
    if (apiSubtasks?.data) {
      const sorted = [...apiSubtasks.data].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      const transformed = transformApiData({ data: sorted });
      setSubTasks(transformed);
    }
  }, [apiSubtasks, users]);
  

  // Rest of your existing code remains exactly the same...
  const [newSubTask, setNewSubTask] = useState({
    subTaskName: "",
    user: "",
    priority: "Medium",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],

    duration: "7 days",
    cost: "",
    status: "Active",
    checked: false,
  });

  // Get date range for all tasks
  const getDateRange = () => {
    if (subTasks.length === 0) return [];

    const dates = [];
    const startDates = subTasks.map((task) => new Date(task.startDate));
    const endDates = subTasks.map((task) => new Date(task.endDate));

    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));

    let currentDate = new Date(minDate);

    while (currentDate <= maxDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dateColumns = getDateRange();


  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10); // You can adjust this number

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = subTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(subTasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDateHeader = (date) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const dayName = days[date.getDay()];
    return `${date.getDate()} ${dayName}`;
  };

  const isTaskActiveOnDate = (task, date) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const currentDate = new Date(date);

    // Reset time components to compare only dates
    taskStart.setHours(0, 0, 0, 0);
    taskEnd.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate >= taskStart && currentDate <= taskEnd;
  };

  const handleAddSubTask = async (e) => {
    const submissionData = {
      name: newSubTask.subTaskName,
      assigned_userid: newSubTask.user || [],
      priority: newSubTask.priority || "Low",
      start_date: newSubTask.startDate || "",
      end_date: [{
        value: newSubTask.endDate || "", updatedby: "User", // Replace with actual user identifier
        timeUpdated: new Date().toISOString(),
      }] || "",
      cost: [{
        value: newSubTask.cost || 0,
        updatedby: "User", // Replace with actual user identifier
        timeUpdated: new Date().toISOString(),
      }],
      status: newSubTask.status || "Active",
      task_id: taskId,
    };

    const response = await dispatch(subcreatetasks({ submissionData }));

    if (response?.meta?.requestStatus === "fulfilled") {
      Swal.fire({
        icon: "success",
        title: "Subtask Submitted Successfully",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
      });

      dispatch(getsubtasklist({ taskId }));



      setNewSubTask({
        subTaskName: "",
        user: [],
        priority: "",
        startDate: "",
        endDate: "",
        cost: "",
        status: "",
        task_id: taskId,
      });



      setTimeout(() => { }, 50);
    } else {
      console.error("Failed to submit subtask:", response?.error);
    }
  };

  const handleTable = () => {
    setOpen(!open);
  };
  const handleAddRow = (taskId) => {
    setSubTasks((prevSubTasks) =>
      prevSubTasks.map((task) => {
        if (task.id === taskId) {
          const newChecklistItem = {
            item: "", // Changed from itemName to item
            toCheck: "",
            checked: false,
          };

          return {
            ...task,
            checklist: [...task.checklist, newChecklistItem],
          };
        }
        return task;
      })
    );
  };

  //file add sub task keliye hai file
  const handleFieldChange = (field, value) => {
    const updatedTask = {
      ...newSubTask,
      [field]: value,
    };

    if (field === "startDate" || field === "endDate") {
      updatedTask.duration = calculateDuration(
        field === "startDate" ? value : newSubTask.startDate,
        field === "endDate" ? value : newSubTask.endDate
      );
    }

    setNewSubTask(updatedTask);
  };

  const handleUpdateTask = async (taskId, field, value) => {
    try {
      const updatedData = {
        [field]: value,
      };

      await dispatch(editsubtasklist({ subtaskId: taskId, updatedData }));
      // await dispatch(allUser())
      setSubTasks(
        subTasks.map((task) => {
          if (task.id === taskId) {
            const updatedTask = { ...task, [field]: value };

            if (field === "startDate" || field === "endDate") {
              const startDate = field === "startDate" ? value : task.startDate;
              const endDate = field === "endDate" ? value : task.endDate;
              updatedTask.duration = calculateDuration(startDate, endDate);
            }

            if (["user", "priority", "status", "cost"].includes(field)) {
              if (field === "user") {
                const userName = getusername(value, users);
                updatedTask.user = userName; // Set display name, not ID
              } else {
                updatedTask[field] = value;
              }

              toast.success(`${field} updated`, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                style: {
                  fontSize: "12px",
                  padding: "6px 12px",
                  minHeight: "auto",
                },
              });
            }

            // Special toast for subtask name
            if (field === "subTaskName") {
              toast.success("Task name updated", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                style: {
                  fontSize: "12px",
                  padding: "6px 12px",
                  minHeight: "auto",
                },
              });
            }

            return updatedTask;
          }

          return task;
        })
      );

      setEditingTask(null);
      setEditingField(null);
    } catch (error) {
      toast.error("Failed to update task", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        style: {
          fontSize: "12px",
          padding: "6px 12px",
          minHeight: "auto",
        },
      });
    }
  };

  const toggleCheckbox = (taskId) => {
    setSubTasks(
      subTasks.map((task) => {
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
      })
    );
  };

  const handleDeleteTask = async (taskId) => {
    console.log(`check the subttask id ${taskId}`);
    await dispatch(deleteSubtask({ SubtaskId: taskId }));
    console.log(`Thisisis task id in comopnent `, taskId);
    dispatch(getsubtasklist({ taskId }));
    toast.success("Successfully deleted");
  };

  const handleKeyDown = (e, taskId, field) => {
    if (e.key === "Enter") {
      if (taskId) {
        handleUpdateTask(taskId, field, e.target.value);
      } else {
        if (!showFullAddForm && newSubTask.subTaskName.trim()) {
          setShowFullAddForm(true);
        } else {
          handleAddSubTask();
        }
      }
    } else if (e.key === "Escape") {
      setEditingTask(null);
      setEditingField(null);
      if (showFullAddForm) {
        setShowFullAddForm(false);
      }
    }
  };

  const handleSingleClick = (taskId, field) => {
    setEditingTask(taskId);
    setEditingField(field);
  };

  const formatCurrency = (value) => {
    if (!value) return "₹0";
    return `₹${parseInt(value).toLocaleString("en-IN")}`;
  };

  // Column resizing handlers
  const startResizing = (column, e) => {
    setResizing({
      isResizing: true,
      column,
      startX: e.clientX,
      startWidth: columnWidths[column],
    });
  };

  const handleChecklistChange = async (taskId, index, field, value) => {
    try {
      setSubTasks((prevSubTasks) =>
        prevSubTasks.map((task) => {
          if (task.id === taskId) {
            const updatedChecklist = [...task.checklist];
            updatedChecklist[index] = {
              ...updatedChecklist[index],
              [field]: value,
            };

            return {
              ...task,
              checklist: updatedChecklist,
            };
          }
          return task;
        })
      );
    } catch (error) {
      toast.error("Failed to update checklist", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleResize = (e) => {
    if (resizing.isResizing) {
      const delta = e.clientX - resizing.startX;
      const newWidth = resizing.startWidth + delta;

      setColumnWidths((prev) => ({
        ...prev,
        [resizing.column]: Math.max(50, newWidth), // Minimum width of 50px
      }));
    }
  };

  const stopResizing = () => {
    if (resizing.isResizing) {
    }

    setResizing({
      isResizing: false,
      column: null,
      startX: 0,
      startWidth: 0,
    });
  };



  useEffect(() => {
    if (resizing.isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resizing.isResizing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full bg-white h-full p-2">
      <ToastContainer />
      <div className="overflow-x-auto">
        {isStandalone && (
          <div className="flex flex-row justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">SubTasks</h2>
            <button className="p-1 px-2">
              <AddSubTaskForm taskId={taskId} />
            </button>
            <button
              className="hover:rotate-180 transition duration-700"
              onClick={() => navigate(-1)}
            >
              <RxCross1 size={18} />
            </button>
          </div>
        )}
      
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="subTasks">
            {(provided,snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                 className={`w-full ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`} 
              >
                <table className="w-full  border-collapse border border-gray-300 table-fixed">
                  <colgroup>
                    <col style={{ width: `${columnWidths.checkbox}px` }} />
                    <col style={{ width: `${columnWidths.id}px` }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: `${columnWidths.assigned}px` }} />
                    <col style={{ width: `${columnWidths.checklist}px` }} />
                    <col style={{ width: `${columnWidths.priority}px` }} />
                    <col style={{ width: `${columnWidths.startDate}px` }} />
                    <col style={{ width: `${columnWidths.endDate}px` }} />
                    <col style={{ width: `${columnWidths.duration}px` }} />
                    <col style={{ width: `${columnWidths.cost}px` }} />
                    <col style={{ width: `${columnWidths.status}px` }} />
                    {dateColumns.map((date, index) => (
                      <col key={index} style={{ width: "30px" }} />
                    ))}
                  </colgroup>

                  <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2"></th>
                      {[
                        { name: "ID", key: "id" },
                        { name: "Sub Task", key: "subTask" },
                        { name: "Assigned", key: "assigned" },
                        { name: "Checklist", key: "checklist" },
                        { name: "Priority", key: "priority" },
                        { name: "Start", key: "startDate" },
                        { name: "End", key: "endDate" },
                        { name: "Duration", key: "duration" },
                        { name: "Cost", key: "cost" },
                        { name: "Status", key: "status" },

                        ...dateColumns.map((date, index) => ({
                          name: formatDateHeader(date),
                          key: `date-${index}`,
                        })),
                      ]
                        .map((col, index) => (
                          <th
                            key={index}
                            className="border border-gray-300 p-2 max-w-[100px]  text-center text-sm font-medium text-gray-700 relative"
                          >
                            {col.name}
                            {col.key !== "id" && col.key !== "subTask" && (
                              <div
                                className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-gray-300 hover:bg-blue-500"
                                onMouseDown={(e) => startResizing(col.key, e)}
                              />
                            )}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {subTasks.map((task, index) => ( */}
                    {currentTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided,snapshot) => (
                          <React.Fragment>
                          <tr
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps?.style,
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          position:'static',
          border:'black'
        }}
        className={`bg-white hover:bg-gray-50 border border-gray-300 ${
          task.checked ? "bg-blue-50" : ""
        }`}
      >
                              <td className="border border-gray-300 p-2 text-center">
                                <div
                                  className={`w-4 h-4 border border-gray-400 flex items-center justify-center cursor-pointer transition-colors mx-auto ${task.checked
                                      ? "bg-blue-500 border-blue-500"
                                      : "bg-white"
                                    }`}
                                  onClick={() => toggleCheckbox(task.id)}
                                >
                                  {task.checked && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
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
                              <td className="border bg-white border-gray-300 p-2 text-start relative group">
                                <div
                                  className="flex items-center justify-between w-full min-h-[40px] relative"
                                  onMouseEnter={(e) =>
                                    e.currentTarget
                                      .querySelector("button")
                                      .classList.replace(
                                        "opacity-0",
                                        "opacity-100"
                                      )
                                  }
                                  onMouseLeave={(e) =>
                                    e.currentTarget
                                      .querySelector("button")
                                      .classList.replace(
                                        "opacity-100",
                                        "opacity-0"
                                      )
                                  }
                                >
                                  <div className="flex-1 truncate pr-2">
                                    {editingTask === task.id &&
                                      editingField === "subTaskName" ? (
                                      <input
                                        type="text"
                                        defaultValue={task.subTaskName}
                                        onBlur={(e) =>
                                          handleUpdateTask(
                                            task.id,
                                            "subTaskName",
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyDown(
                                            e,
                                            task.id,
                                            "subTaskName"
                                          )
                                        }
                                        className="w-full p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                        autoFocus
                                      />
                                    ) : (
                                      <span className="block truncate">
                                        {task.subTaskName}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    className="px-2 opacity-0  right bg-purple-50  py-1 text-sm font-medium rounded-lg  duration-200
                                                border-1 border-purple-600 text-purple-600 hover:bg-purple-50
                                                  group-hover:opacity-100 absolute right-0"

                                    // onClick={() => {
                                    //   const validIndex = apiSubtasks.data.length - (index + 1);
                                    //   navigate(`/project/${id}/task/${task.id}/subtaskwithin/View`, {
                                    //     state: {
                                    //       subtaskData: task,
                                    //       apiSubtasks: apiSubtasks.data[index],
                                    //       index: index,
                                    //       projectId: id,
                                    //       parentTaskId: taskId,
                                    //     },
                                    //   });
                                    // }}

                                    onClick={() => {
                                      const matchedApiSubtask = apiSubtasks.data.find((item) => item._id === task.id);
                                    
                                      navigate(`/project/${id}/task/${task.id}/subtaskwithin/View`, {
                                        state: {
                                          subtaskData: task,
                                          apiSubtasks: matchedApiSubtask,  // correctly matched original data
                                          index: index, // UI index, not needed for logic anymore
                                          projectId: id,
                                          parentTaskId: taskId,
                                        },
                                      });
                                    }}
                                    

                                  >
                                    View

                                  </button>
                                </div>
                              </td>

                              <td
                                className="border border-gray-300 p-2 text-sm text-center overflow-hidden"
                                onClick={() =>
                                  handleSingleClick(task.id, "user")
                                }
                              >
                                {editingTask === task.id &&
                                  editingField === "user" ? (
                                  <select
                                    value={
                                      users.find((u) => u.name === task.user)
                                        ?._id || ""
                                    }
                                    onChange={(e) =>
                                      handleUpdateTask(
                                        task.id,
                                        "user",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => {
                                      setEditingTask(null);
                                      setEditingField(null);
                                    }}
                                    className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                  >
                                    <option value="">Unassigned</option>
                                    {users.map((user) => (
                                      <option key={user._id} value={user._id}>
                                        {user.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="block truncate">
                                    {/* {console.log(`thisis trask in react *************${JSON.stringify(task.user)}`)} */}
                                    {task.user}
                                  </span>
                                )}
                              </td>

                              <td>
                                <div>
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={openChecklistTaskId === task.id}
                                      onChange={() =>
                                        setOpenChecklistTaskId((prev) =>
                                          prev === task.id ? null : task.id
                                        )
                                      }
                                    />
                                  </label>

                                  {openChecklistTaskId && (
                                    <div className="absolute top-10 left-0 z-50 bg-white shadow-lg p-4 border border-gray-300">
                                      <div className="flex flex-row justify-between">
                                        <div className="flex text-2xl font-bold">
                                          Check-List
                                        </div>
                                        <div className="flex">
                                          <button
                                            onClick={() =>
                                              setOpenChecklistTaskId(null)
                                            }
                                          >
                                            <RxCross2 size={30} />
                                          </button>
                                        </div>
                                      </div>

                                      {subTasks
                                        .filter(
                                          (task) =>
                                            task.id === openChecklistTaskId
                                        )
                                        .map((task) => (
                                          <form key={task.id}>
                                            <table className="mt-4 border-collapse border border-gray-400 w-full">
                                              <thead>
                                                <tr className="bg-gray-200">
                                                  <th className="border p-2">
                                                    Item
                                                  </th>
                                                  <th className="border p-2">
                                                    To-Check
                                                  </th>
                                                  <th className="border p-2">
                                                    Confirm
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {task.checklist.map(
                                                  (checklistItem, index) => (
                                                    <tr key={index}>
                                                      <td className="border p-2">
                                                        <input
                                                          type="text"
                                                          value={
                                                            checklistItem.item
                                                          }
                                                          onChange={(e) =>
                                                            handleChecklistChange(
                                                              task.id,
                                                              index,
                                                              "item",
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-full"
                                                        />
                                                      </td>
                                                      <td className="border p-2">
                                                        <input
                                                          type="text"
                                                          value={
                                                            checklistItem.toCheck
                                                          }
                                                          onChange={(e) =>
                                                            handleChecklistChange(
                                                              task.id,
                                                              index,
                                                              "toCheck",
                                                              e.target.value
                                                            )
                                                          }
                                                          className="w-full"
                                                        />
                                                      </td>
                                                      <td className="border p-2 text-center">
                                                        <Checkbox
                                                          checked={
                                                            checklistItem.checked
                                                          }
                                                          onChange={(e) =>
                                                            handleChecklistChange(
                                                              task.id,
                                                              index,
                                                              "checked",
                                                              e.target.checked
                                                            )
                                                          }
                                                        />
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </table>

                                            <div className="flex gap-6 mt-4">
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  dispatch(
                                                    editsubtasklist({
                                                      subtaskId: task.id,
                                                      updatedData: {
                                                        checklist:
                                                          task.checklist,
                                                      },
                                                    })
                                                  );
                                                  toast.success("Checklist saved successfully!", {
                                                    position: "top-right",
                                                    autoClose: 1000,
                                                    hideProgressBar: true,
                                                  });
                                                  setOpenChecklistTaskId(null);
                                                }}
                                                className="p-2 bg-blue-500 rounded text-white"
                                              >
                                                Save
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleAddRow(task.id)
                                                }
                                                className="p-2 bg-green-500 rounded text-white"
                                              >
                                                Add More
                                              </button>
                                            </div>
                                          </form>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td
                                className={`border border-gray-300 p-2 text-sm text-center relative ${task.priority === "High"
                                    ? "bg-red-500 text-white"
                                    : task.priority === "Medium"
                                      ? "bg-green-500 text-white"
                                      : "bg-blue-500 text-white"
                                  }`}
                                onClick={() => {
                                  setEdittask(true);
                                }}
                              >
                                {edittask ? (
                                  <select
                                    defaultValue={task.priority}
                                    onChange={(e) =>
                                      handleUpdateTask(
                                        task.id,
                                        "priority",
                                        e.target.value
                                      )
                                    }
                                    className="absolute left-0 top-0 w-full h-full text-center appearance-none bg-transparent focus:ring-0 focus:outline-none"
                                    autoFocus
                                    onBlur={() => {
                                      setEditingTask(null);
                                      setEditingField(null);
                                    }}
                                  >
                                    <option
                                      className="text-black bg-white"
                                      value="High"
                                    >
                                      High
                                    </option>
                                    <option
                                      className="text-black bg-white"
                                      value="Medium"
                                    >
                                      Medium
                                    </option>
                                    <option
                                      className="text-black bg-white"
                                      value="Low"
                                    >
                                      Low
                                    </option>
                                  </select>
                                ) : (
                                  task.priority
                                )}
                              </td>
                              <td
                                className="border border-gray-300 p-2 text-sm text-center"
                                onClick={() =>
                                  handleSingleClick(task.id, "startDate")
                                }
                              >
                                {editingTask === task.id &&
                                  editingField === "startDate" ? (
                                  <input
                                    type="date"
                                    defaultValue={task.startDate}
                                    onChange={(e) =>
                                      handleUpdateTask(
                                        task.id,
                                        "startDate",
                                        e.target.value
                                      )
                                    }
                                    className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                  />
                                ) : (
                                  task.startDate
                                )}
                              </td>
                              <td
                                onClick={() => {
                                  setTempDate(task.endDate);
                                  handleSingleClick(task.id, "endDate");
                                }}
                              >
                                {editingTask === task.id &&
                                  editingField === "endDate" ? (
                                  <input
                                    type="date"
                                    defaultValue={task.endDate}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setTimeout(() => {
                                        handleUpdateTask(
                                          task.id,
                                          "endDate",
                                          value
                                        );
                                      }, 4000); // ye 4 sec late karedga okay
                                    }}
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
                                onClick={() =>
                                  handleSingleClick(task.id, "cost")
                                }
                              >
                                {editingTask === task.id &&
                                  editingField === "cost" ? (
                                  <div className="flex justify-center items-center">
                                    <span className="mr-1">₹</span>
                                    <input
                                      type="number"
                                      defaultValue={task.cost}
                                      onBlur={(e) =>
                                        handleUpdateTask(
                                          task.id,
                                          "cost",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={(e) =>
                                        handleKeyDown(e, task.id, "cost")
                                      }
                                      className="w-20 text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                      autoFocus
                                    />
                                  </div>
                                ) : (
                                  formatCurrency(task.cost)
                                )}
                              </td>
                              <td
                                className={`border border-gray-300 p-2 text-sm text-center relative ${task.status === "Active"
                                    ? "bg-green-500 text-white"
                                    : task.status === "In Progress"
                                      ? "bg-yellow-500 text-black"
                                      : "bg-red-500 text-white"
                                  }`}
                                onClick={() => {
                                  if (
                                    editingTask !== task.id ||
                                    editingField !== "status"
                                  ) {
                                    setEditingTask(task.id);
                                    setEditingField("status");
                                  }
                                }}
                              >
                                {editingTask === task.id &&
                                  editingField === "status" ? (
                                  <select
                                    defaultValue={task.status}
                                    // onChange={(e) => handleUpdateTask(task.id, 'status', e.target.value)

                                    // }

                                    onChange={(e) => {
                                      handleUpdateTask(
                                        task.id,
                                        "status",
                                        e.target.value
                                      );
                                    }}
                                    className="absolute left-0 top-0 w-full h-full text-center appearance-none bg-transparent focus:ring-0 focus:outline-none"
                                    autoFocus
                                    onBlur={() => {
                                      setEditingTask(null);
                                      setEditingField(null);
                                    }}
                                  >
                                    <option
                                      className="text-black bg-white"
                                      value="Active"
                                    >
                                      Active
                                    </option>
                                    <option
                                      className="text-black bg-white"
                                      value="In Progress"
                                    >
                                      In Progress
                                    </option>
                                    <option
                                      className="text-black bg-white"
                                      value="Completed"
                                    >
                                      Completed
                                    </option>
                                  </select>
                                ) : (
                                  task.status
                                )}
                              </td>

                              {/* ganth chart of the */}

                              {/* Date columns */}
                              {/* {dateColumns.map((date, colIndex) => {
                                const isActive = isTaskActiveOnDate(task, date);
                                return (
                                  <td
                                    key={`${task.id}-${colIndex}`}
                                    className={`border border-gray-300 p-1 ${isActive ? 'bg-blue-400' : ''}`}
                                    title={`${date.toDateString()}`}
                                  >
                                    {isActive ? '' : ''}
                                  </td>
                                );
                              })} */}





                              {dateColumns.map((date, colIndex) => {
                                const isActive = isTaskActiveOnDate(task, date);
                                const isStart =
                                  isActive &&
                                  (colIndex === 0 ||
                                    !isTaskActiveOnDate(
                                      task,
                                      dateColumns[colIndex - 1]
                                    ));
                                const isEnd =
                                  isActive &&
                                  (colIndex === dateColumns.length - 1 ||
                                    !isTaskActiveOnDate(
                                      task,
                                      dateColumns[colIndex + 1]
                                    ));
                                const isToday =
                                  date.toDateString() ===
                                  new Date().toDateString();

                                return (
                                  <td
                                    key={`${task.id}-${colIndex}`}
                                    className={`relative h-8 p-0 border   border-gray-100 group ${isToday ? "bg-yellow-50" : ""}
`}
                                    style={{ minWidth: "28px" }}
                                    title={`${date.toDateString()}${isActive ? `\n${task.subTaskName}` : ""
                                      }`}
                                  >
                                    {/* Background cell */}
                                    <div
                                      className={`
absolute 
inset-0 
flex 
items-center 
justify-center
${isToday ? "border-t-2 border-t-yellow-400" : ""}
`}
                                    >
                                      {date.getDate() === 1 && (
                                        <span className="text-xs text-gray-400 absolute top-0 left-0 px-0.5">
                                          {date.toLocaleString("default", {
                                            month: "short",
                                          })}
                                        </span>
                                      )}
                                    </div>

                                    {/* Gantt bar */}
                                    {isActive && (
                                      <div
                                        className={`
absolute
top-1/2
-translate-y-1/2
h-6

left-0
right-0
${isStart ? "rounded-l-full" : ""}
${isEnd ? "rounded-r-full" : ""}
${task.priority === "High"
                                            ? "bg-gradient-to-r from-red-500 to-red-600"
                                            : task.priority === "Medium"
                                              ? "bg-gradient-to-r from-green-500 to-green-600"
                                              : "bg-gradient-to-r from-blue-500 to-blue-600"
                                          }
shadow-md
transition-all
duration-200
hover:h-7
hover:shadow-lg
flex
items-center
justify-center
overflow-hidden
`}
                                      >
                                        {/* Progress indicator */}
                                        <div
                                          className={`
absolute 
left-0 
top-0 
bottom-0 
${task.status === "Completed" ? "bg-green-300" : "bg-white"}
bg-opacity-30
`}
                                          style={{
                                            width: `${task.progress || 0}%`,
                                            transition: "width 0.3s ease",
                                          }}
                                        />

                                        {/* Date label on hover */}
                                        <span
                                          className="
text-white 
text-xs 
font-medium 
opacity-0 
group-hover:opacity-100
transition-opacity
duration-200
whitespace-nowrap
z-10
"
                                        >
                                          {colIndex % 5 === 0 ||
                                            isStart ||
                                            isEnd
                                            ? formatDateHeader(date)
                                            : ""}
                                        </span>
                                      </div>
                                    )}

                                    {/* Current day marker */}
                                    {isToday && !isActive && (
                                      <div
                                        className="
absolute 
top-1/2 
left-1/2 
-translate-x-1/2 
-translate-y-1/2
w-1 
h-1 
rounded-full 
bg-yellow-500
"
                                      />
                                    )}
                                  </td>
                                );
                              })}


                              {/* 
                                 ****************************************************************************
                                 **********Add code of Gane Chart ********************
                                 ****************************************************************************
                                 
                                 
                                 */}






                            </tr>

                            {task.checked && (
                              <tr className=" bg-blue-50 w-[100vw] flex flex-1 ">
                                <td
                                  colSpan={11 + dateColumns.length}
                                  className="  p-2"
                                >
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
                                        setEditingField("user");
                                      }}
                                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                    >
                                      Assign
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField("startDate");
                                      }}
                                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                                    >
                                      Start Date
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField("endDate");
                                      }}
                                      className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
                                    >
                                      End Date
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField("status");
                                      }}
                                      className="px-2 py-1 bg-yellow-500 text-black text-xs rounded hover:bg-yellow-600"
                                    >
                                      Status
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField("priority");
                                      }}
                                      className="px-2 py-1 bg-indigo-500 w-[60px] text-white text-xs rounded hover:bg-indigo-600"
                                    >
                                      Priority
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingTask(task.id);
                                        setEditingField("cost");
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
                        <form onSubmit={handleAddSubTask}>
                          <input



                            ref={inputRef}
                            type="text"
                            name="subTaskName"
                            value={newSubTask.subTaskName}
                            onChange={(e) =>
                              handleFieldChange("subTaskName", e.target.value)
                            }
                            placeholder="+ Add Sub Task (press Enter)"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSubTask();
                              }
                            }}
                            className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                          />
                        </form>
                      </td>
                      {showFullAddForm ? (
                        <>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="text"
                              name="user"
                              value={newSubTask.user}
                              onChange={(e) =>
                                handleFieldChange("user", e.target.value)
                              }
                              onKeyDown={handleKeyDown}
                              placeholder="Assignee"
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <select
                              name="priority"
                              value={newSubTask.priority}
                              onChange={(e) =>
                                handleFieldChange("priority", e.target.value)
                              }
                              className="w-full text-center p-2 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            >
                              <option
                                className="w-full text-black"
                                value="High"
                              >
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
                              type="date"
                              name="startDate"
                              value={newSubTask.startDate}
                              onChange={(e) =>
                                handleFieldChange("startDate", e.target.value)
                              }
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="date"
                              name="endDate"
                              value={newSubTask.endDate}
                              onChange={(e) =>
                                handleFieldChange("endDate", e.target.value)
                              }
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
                                name="cost"
                                value={newSubTask.cost}
                                onChange={(e) =>
                                  handleFieldChange("cost", e.target.value)
                                }
                                className="w-20 text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                                placeholder="0"
                              />
                            </div>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <select
                              name="status"
                              value={newSubTask.status}
                              onChange={(e) =>
                                handleFieldChange("status", e.target.value)
                              }
                              className="w-full text-center p-0 border-0 bg-transparent focus:ring-0 focus:outline-none"
                            >
                              <option value="Active">Active</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          {dateColumns.map((date, index) => (
                            <td
                              key={`new-${index}`}
                              className="border border-gray-300 p-1  "
                            ></td>
                          ))}
                        </>
                      ) : (
                        <td
                          colSpan={9 + dateColumns.length}
                          className="border border-gray-300 p-2 text-sm"
                        >
                          {/* Empty cells when form is collapsed */}
                        </td>
                      )}
                    </tr>

                    {provided.placeholder}
                  </tbody>
                </table>

                {/*pagination*/}
                {subTasks.length > tasksPerPage && (
                  <div className="flex  justify-center mt-4">
                    <nav className="inline-flex  rounded-md shadow">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === number
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            {number}
                          </button>
                        )
                      )}

                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
            
      </div>
    </div>
  );
};



export default ProjectViewSubTask;





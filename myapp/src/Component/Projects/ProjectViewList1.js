import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { projectdetails } from "../../FeatureRedux/projectSlice/detailproject";
import { addtask } from "../../FeatureRedux/task/addtaskSlice";
import AddTaskForm from "./AddTaskForm";
import { Box, Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectViewList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projectdetails);
  const [showTask, setShowTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch project details
  useEffect(() => {
    dispatch(projectdetails(id));
  }, [dispatch, id]);

  // Update task list when project data changes
  useEffect(() => {
    if (projects?.task?.tasks) {
      setTasks(
        projects.task.tasks.map((task, index) => ({
          ...task,
          id: task._id || `temp-${index}`,
        }))
      );
    } else {
      setTasks([]);
    }
  }, [projects.task]);

  const handleAddTaskSubmit = (projectId, newTask) => {
    dispatch(addtask({ projectId, task: newTask }));
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Task Title", width: 200 },
    { field: "status", headerName: "Task Status", width: 150 },
    { field: "priority", headerName: "Task Priority", width: 150 },
    {
      field: "repeat",
      headerName: "Repeat",
      width: 100,
      valueGetter: (params) => (params?.row ? params.row.repeat ?? "No" : "No"),
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   renderCell: (params) =>
    //     params?.row ? (
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         onClick={() => handleViewTask(params.row.id)}
    //       >
    //         View Task
    //       </Button>
    //     ) : null,
    // },
  ];

  return (
    <Box
      sx={{
        width: "100%", // Full width of viewport
        height: "100%", // Full height of viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 3,
          borderRadius: "8px",
          boxShadow: 3,
          width: "100%", // Full width
          height: "95vh", // Full height
          display: "flex",
        
          flexDirection: "column",
        }}
      >


        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Project Details</h1>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <Button variant="contained" color="primary" onClick={() => setShowTask(true)}>
            ADD TASK
          </Button>
        </Box>

        {showTask && (
          <AddTaskForm
            projectId={id}
            onSubmit={handleAddTaskSubmit}
            onCancel={() => setShowTask(false)}
          />
        )}

        <Box sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {tasks.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ flex: 1, overflowY: "auto" }}
                  >
                    <DataGridPro
                      rows={tasks}
                      columns={columns}
                      disableSelectionOnClick
                      rowReordering
                      
                      autoHeight
                      rowHeight={35}
                      headerHeight={105}
                      pageSizeOptions={[5, 10, 20]}
                     

                      sx={{
                        minHeight: "500px",
                        backgroundColor:"#f7f9fb",
                        overflowX: "auto",
                        border: "2px solid #efefef", // Outer border for the table
                        borderRadius: "8px", // Rounded corners (optional)
                        
                        "& .MuiDataGrid-cell": {
                          borderRight: "0.25px solid #efefef", // Column borders
                          borderBottom: "0.25px solid #efefef", // Row borders
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          borderBottom: "0.25px solid  #efefef", // Bottom border for headers
                          
                        },
                        "& .MuiDataGrid-columnHeader": {
                          borderRight: "0.25px solid  #efefef", // Column borders in header
                        },
                        
                        "& .MuiDataGrid-columnHeader:last-child, & .MuiDataGrid-cell:last-child": {
                          borderRight: "none", // Remove right border for the last column
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                          fontWeight: "bold", // Make header text bold
                          rowHeight:"25px",
                          
                          
                        },
                      }}


                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <Box sx={{ textAlign: "center", marginTop: 5, fontSize: "18px" }}>
              No tasks available.
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectViewList;

// reorderSubtaskSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const reorderSubtask = createAsyncThunk(
    "subtasks/reorder",
    async (orderedSubtasks, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/api/subtask/reorder", {
          orderedSubtaskIds: orderedSubtasks
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to reorder subtasks"
        );
      }
    }
  );

const reorderSubtaskSlice = createSlice({
  name: "reorderSubtask",
  initialState: {
    isLoading: false,
    error: null,
    success: false
  },
  reducers: {
    resetReorderStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(reorderSubtask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(reorderSubtask.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(reorderSubtask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });
  }
});

export const { resetReorderStatus } = reorderSubtaskSlice.actions;
export default reorderSubtaskSlice.reducer;


// const handleDragEnd = async (result) => {
//     if (!result.destination) return;
  
//     // Create a new array with updated positions
//     const reorderedTasks = Array.from(subTasks);
//     const [movedItem] = reorderedTasks.splice(result.source.index, 1);
//     reorderedTasks.splice(result.destination.index, 0, movedItem);
  
//     // Update local state immediately with new positions
//     const updatedTasks = reorderedTasks.map((task, index) => ({
//       ...task,
//       position: index // Update position based on new order
//     }));
  
//     setSubTasks(updatedTasks);
  
//     try {
//       // Prepare payload for API
//       const orderedSubtasks = updatedTasks.map((task, index) => ({
//         id: task.id,
//         order: index
//       }));
  
//       // Dispatch the reorder action
//       const response = await dispatch(reorderSubtask(orderedSubtasks));
      
//       if (response.meta.requestStatus === 'fulfilled') {
//         toast.success("Subtasks reordered successfully");
//       } else {
//         // Revert if API fails
//         if (apiSubtasks?.data) {
//           setSubTasks(transformApiData(apiSubtasks));
//         }
//         toast.error("Failed to save new order");
//       }
//     } catch (error) {
//       console.error("Reorder error:", error);
//       toast.error("Failed to save new order");
//       // Revert to original order if API fails
//       if (apiSubtasks?.data) {
//         setSubTasks(transformApiData(apiSubtasks));
//       }
//     }
//   };


// const transformApiData = (apiData) => {
//     if (!apiData?.data) return [];
  
//     // Sort by position before transforming
//     const sortedData = [...apiData.data].sort((a, b) => a.position - b.position);
  
//     return sortedData.map((task) => {
//       // ... rest of your existing transform logic
//       return {
//         // ... all your existing properties
//         position: task.position || 0, // Add position to your transformed data
//       };
//     });
//   };
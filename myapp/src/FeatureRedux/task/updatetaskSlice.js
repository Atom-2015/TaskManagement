import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk for updating the task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, completedUnit, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/task/updatetask`, {
        taskId, // Task ID
        completedUnit, // Completed Units
        priority: status, // Assuming priority is used for the status
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload.data._id ? action.payload.data : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default taskSlice.reducer;

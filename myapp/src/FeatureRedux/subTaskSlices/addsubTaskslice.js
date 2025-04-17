import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
export const subcreatetasks = createAsyncThunk(
    "createsubtask/subtaskform",
    async (formData , { rejectWithValue }) => {
      
      try {
        console.log("axios in try ke aandar hoon" , formData)
        const response = await axiosInstance.post("/api/subtask/createSubtask", formData.submissionData, {
          headers: {
            "Content-Type": "application/json",
            "x-task-id": formData.submissionData.task_id,
          },
        });
        return response.data;
      } catch (error) {
       
        return rejectWithValue(
          error.response?.data?.message || "Failed to show sub task"
        );
      }
    }
  );
  

const addsubtask = createSlice({
  name: "addsubtask",
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subcreatetasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.data = [];
        state.errorMessage = "";
      })
      .addCase(subcreatetasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to add subtask";
        state.data = [];
      })
      .addCase(subcreatetasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.errorMessage = "";
      });
  },
});

export default addsubtask.reducer;

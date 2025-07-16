import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const deleteSubtask = createAsyncThunk(
    "deleteSubtask/SubtaskDelete",
    async (SubtaskId, { rejectWithValue }) => {
        // console.log(`this is subtask id ${JSON.stringify(SubtaskId.)}`)
      try {
        const response = await axiosInstance.delete(`/api/subtask/Subtask/${SubtaskId.SubtaskId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to delete subtask"
        );
      }
    }
  );
  
  

const deleteSubtaskslice = createSlice({
  name: "deleteSubtask",
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSubtask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.data = [];
        state.errorMessage = "";
      })
      .addCase(deleteSubtask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to delete task";
        state.data = [];
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.errorMessage = "";
      });
  },
});

export default deleteSubtaskslice.reducer;

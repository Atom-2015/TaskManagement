import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to delete a project
export const projectDelete = createAsyncThunk(
  "projectDelete",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/project/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }
);

const deleteProjectitem = createSlice({
  name: "projectDelete",
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectDelete.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.data = [];
        state.errorMessage = "";
      })
      .addCase(projectDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to delete the project";
        state.data = [];
      })
      .addCase(projectDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.errorMessage = "";
      });
  },
});

export default deleteProjectitem.reducer;

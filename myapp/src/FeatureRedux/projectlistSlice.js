import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Async thunk to fetch project list
export const projectlist = createAsyncThunk(
  "projectlist",
  async (formData, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get("/api/project/allprojects", formData);
    
      return response.data.data;
    
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to show projects"
      );
    }
  }
);

// Slice to handle project list state
const Projectlist = createSlice({
  name: "projectlist",
  initialState: {
    isError: false, // Corrected key to camelCase
    isLoading: false,
    projects: [], // Corrected key to plural for better clarity
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.projects = [];
        state.errorMessage = "";
      })
      .addCase(projectlist.rejected, (state, action) => {
        state.projects = [];
        state.errorMessage = action.payload || "Failed to show projects";
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(projectlist.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
      });
  },
});

export default Projectlist.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const alltasks = createAsyncThunk(
  "subtask/alltasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/task/alltask",    {
        headers:{
          'x-project-id':localStorage.getItem('Projectid')
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to show sub task"
      );
    }
  }
);

const subtasklist = createSlice({
  name: "subtasklist",
  initialState: {
    isError: false,
    isLoading: false,
    data: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(alltasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.data = [];
        state.errorMessage = "";
      })
      .addCase(alltasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to show sub task";
        state.data = [];
      })
      .addCase(alltasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.errorMessage = "";
      });
  },
});

export default subtasklist.reducer;

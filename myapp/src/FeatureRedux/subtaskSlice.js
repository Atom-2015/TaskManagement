import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const getProducts = createAsyncThunk(
  "subtask/getProducts",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/subtask", formData);
      return response.data;
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
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.data = [];
        state.errorMessage = "";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to show sub task";
        state.data = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.errorMessage = "";
      });
  },
});

export default subtasklist.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to delete a revenue item
export const delRevenue = createAsyncThunk(
  "delRevenue",
  async (revenueId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/revenue/${revenueId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete"
      );
    }
  }
);

const delRevenueSlice = createSlice({
  name: "delRevenue",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    delData: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(delRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(delRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.delData = action.payload;
      })
      .addCase(delRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.delData = null;
        state.errorMessage = action.payload || "Failed to delete";
      });
  },
});

export default delRevenueSlice.reducer;

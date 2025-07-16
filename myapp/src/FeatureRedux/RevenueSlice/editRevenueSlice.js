import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const editRevenue = createAsyncThunk(
  "editRevenue",
  async ({ revenueId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/revenue/${revenueId}`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit"
      );
    }
  }
);

const editRevenueSlice = createSlice({
  name: "editRevenue",
  initialState: {
    isError: false,
    isLoading: false,
    editData: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.editData = [];
        state.errorMessage = "";
      })
      .addCase(editRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to edit";
        state.editData = [];
      })
      .addCase(editRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.editData = action.payload;
        state.errorMessage = "";
      });
  },
});

export default editRevenueSlice.reducer;

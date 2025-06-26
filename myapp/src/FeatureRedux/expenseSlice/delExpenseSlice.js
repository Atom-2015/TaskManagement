import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to delete an expense
export const delExpense = createAsyncThunk(
  "delExpense",
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/expense/${expenseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete"
      );
    }
  }
);

// Slice
const delExpenseSlice = createSlice({
  name: "delExpense",
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
      .addCase(delExpense.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.delData = null;
      })
      .addCase(delExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.delData = action.payload;
        state.errorMessage = "";
      })
      .addCase(delExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.delData = null;
        state.errorMessage = action.payload || "Failed to delete";
      });
  },
});

export default delExpenseSlice.reducer;

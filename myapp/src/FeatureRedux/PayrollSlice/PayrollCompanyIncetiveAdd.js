import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to add an incentive to payroll
export const addPayrollIncentive = createAsyncThunk(
  "payroll/addIncentive",
  async ({ payrollId, incentiveData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/api/payroll/${payrollId}/incentive`,
        incentiveData
      );
      return response.data;
    } catch (error) {
      console.error("Add Incentive Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add incentive"
      );
    }
  }
);

const payrollAddIncentiveSlice = createSlice({
  name: "addPayrollIncentive",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    errorMessage: "",
  },
  reducers: {
    resetAddIncentiveState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.data = null;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPayrollIncentive.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addPayrollIncentive.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(addPayrollIncentive.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to add incentive";
      });
  },
});

export const { resetAddIncentiveState } = payrollAddIncentiveSlice.actions;
export default payrollAddIncentiveSlice.reducer;

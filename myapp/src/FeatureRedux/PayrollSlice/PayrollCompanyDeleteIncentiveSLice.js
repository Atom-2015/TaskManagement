import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance"; // adjust based on your setup

// ✅ Async thunk to delete an incentive
export const deletePayrollIncentive = createAsyncThunk(
  "payroll/deleteIncentive",
  async (incentiveId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/payroll/${incentiveId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);



const PayrollCompanyIncentiveSlice = createSlice({
  name: "deletePayrollIncentive",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePayrollIncentive.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletePayrollIncentive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deletePayrollIncentive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete incentive";
      });
  },
});

export default PayrollCompanyIncentiveSlice.reducer;
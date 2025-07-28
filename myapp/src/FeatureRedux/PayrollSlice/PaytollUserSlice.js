import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch detailed annual salary summary for a user
export const getUserAnnualSalarySummary = createAsyncThunk(
  "payroll/userAnnualSalaryDetailed",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/payroll/User?year=${year}`);
      return response.data.data; // detailed monthly data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch salary summary");
    }
  }
);

const userAnnualSalarySlice = createSlice({
  name: "getUserAnnualSalarySummary",
  initialState: {
    loading: false,
    error: null,
    summary: [], // each item has month, salary, incentives[], totalIncentives, deductions{}, netPay
  },
  reducers: {
    clearUserAnnualSalary: (state) => {
      state.loading = false;
      state.error = null;
      state.summary = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAnnualSalarySummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAnnualSalarySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getUserAnnualSalarySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserAnnualSalary } = userAnnualSalarySlice.actions;
export default userAnnualSalarySlice.reducer;

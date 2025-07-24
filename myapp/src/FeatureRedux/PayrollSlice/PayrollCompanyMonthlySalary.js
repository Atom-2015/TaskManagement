import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch payroll summary for a specific month and year
export const getMonthlyPayrollSummary = createAsyncThunk(
  "monthlyPayroll/fetchSummary",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/payroll/getall?month=${month}&year=${year}`
      );

      console.log("ye hai api call ka ",response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching payroll summary:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payroll summary"
      );
    }
  }
);

const getMonthlyPayrollSummarySlice = createSlice({
  name: "getMonthlyPayrollSummary",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
    message: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyPayrollSummary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(getMonthlyPayrollSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data || [];
        state.message = action.payload.message || "";
        state.isSuccess = true;
      })
      .addCase(getMonthlyPayrollSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch payroll summary";
        state.data = [];
        state.isSuccess = false;
      });
  },
});

export default getMonthlyPayrollSummarySlice.reducer;

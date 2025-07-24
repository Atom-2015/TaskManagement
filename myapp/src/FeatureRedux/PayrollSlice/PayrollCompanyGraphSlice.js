import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch company monthly salary with change
export const getCompanyMonthlySalary = createAsyncThunk(
  "companySalary/fetchMonthly",
  async (year, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/payroll/Allmonth?year=${year}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching company monthly salary:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company monthly salary"
      );
    }
  }
);

const getCompanyMonthlySalarySlice = createSlice({
  name: "getCompanyMonthlySalary",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
    year: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyMonthlySalary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(getCompanyMonthlySalary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.monthlySalary || [];
        state.year = action.payload.year || null;
        state.isSuccess = true;
      })
      .addCase(getCompanyMonthlySalary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch company monthly salary";
        state.data = [];
        state.isSuccess = false;
      });
  },
});

export default getCompanyMonthlySalarySlice.reducer;

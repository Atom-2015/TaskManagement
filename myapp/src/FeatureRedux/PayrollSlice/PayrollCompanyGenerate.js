// src/redux/slices/payrollSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


// Create Payroll API Call
export const generatePayroll = createAsyncThunk(
  "payroll/generate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/payroll/create", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate payroll"
      );
    }
  }
);

const payrollSlice = createSlice({
  name: "generatePayroll",
  initialState: {
    loading: false,
    success: false,
    error: false,
    errorMessage: "",
    message: "",
    data: null,
  },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(generatePayroll.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
        state.data = null;
      })
      .addCase(generatePayroll.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(generatePayroll.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetPayrollState } = payrollSlice.actions;
export default payrollSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ✅ Async thunk for fetching monthly salary/attendance data
export const GetMonthSalary = createAsyncThunk(
  "attend/Month",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/attend/getMonthly?month=${month}&year=${year}`);
      return response.data; // { success, message, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch month data"
      );
    }
  }
);

// ✅ Slice definition
const GetMonthSalarySlice = createSlice({
  name: "GetMonthSalary",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null,
    errorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetMonthSalary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      .addCase(GetMonthSalary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data; // payload should have { success, message, data }
      })

      .addCase(GetMonthSalary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default GetMonthSalarySlice.reducer;

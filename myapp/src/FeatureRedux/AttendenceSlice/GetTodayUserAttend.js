import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to fetch today's attendance
export const GetTodayAttendance = createAsyncThunk(
  "attendance/fetchToday",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/attend/today");
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's attendance"
      );
    }
  }
);

const GetTodayAttendanceSlice = createSlice({
  name: "GetTodayAttendance",
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
      .addCase(GetTodayAttendance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetTodayAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(GetTodayAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.data = null;
        state.errorMessage = action.payload;
      });
  },
});

export default GetTodayAttendanceSlice.reducer;

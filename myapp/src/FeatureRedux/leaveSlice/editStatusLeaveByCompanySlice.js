import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to update leave status (approve/reject)
export const updateLeaveStatus = createAsyncThunk(
  "leaveStatus/update",
  async ({ userId, leaveId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/api/leave/update-status", {
        userId,
        leaveId,
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update leave status"
      );
    }
  }
);

// Slice for update leave status
const updateLeaveStatusSlice = createSlice({
  name: "updateLeaveStatus",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    updatedLeave: null,
  },
  reducers: {
    resetLeaveStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.updatedLeave = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLeaveStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedLeave = action.payload.data;
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message || "Something went wrong";
      });
  },
});

export const { resetLeaveStatus } = updateLeaveStatusSlice.actions;
export default updateLeaveStatusSlice.reducer;

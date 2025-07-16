import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to apply leave
export const applyLeaveUser = createAsyncThunk(
  "applyLeaveUser",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/leave/user-leave", leaveData);

      return {
        data: response.data.data,
        message: response.data.message, // ✅ include the message
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to apply for leave"
      );
    }
  }
);


const applyLeaveUserSlice = createSlice({
  name: "applyLeaveUser",
  initialState: {
    isError: false,
    isLoading: false,
    postData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetApplyLeaveState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.postData = null;
      state.errorMessage = "";
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyLeaveUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(applyLeaveUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(applyLeaveUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload?.message || "Failed to apply for leave";
        state.isSuccess = false;
      });
  },
});


export default applyLeaveUserSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch leave balance
export const getleaveBalance = createAsyncThunk(
  "getleaveBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/leave/balanceleave`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch leave balance"
      );
    }
  }
);

// Slice
const getLeavebalanceSlice = createSlice({
  name: "getleaveBalance",
  initialState: {
    isError: false,
    isLoading: false,
    getData: [],
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getleaveBalance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })

      .addCase(getleaveBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.getData = action.payload.data || []; // assuming API returns { data: [...] }
        state.isSuccess = true;
      })

      .addCase(getleaveBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || "Something went wrong";
        state.isSuccess = false;
      });
  },
});

export default getLeavebalanceSlice.reducer;

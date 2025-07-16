import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch all revenue entries
export const getRevenue = createAsyncThunk(
  "getRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/revenue/allrevenue");
       console.log("📡 API Response from /api/revenue/allrevenue:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch revenue data"
      );
    }
  }
);

// Slice definition
const getRevenueSlice = createSlice({
  name: "getRevenue",
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
      .addCase(getRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.getData = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.getData = [];
        state.errorMessage = action.payload || "Failed to fetch revenue data";
        state.isSuccess = false;
      });
  },
});

export default getRevenueSlice.reducer;

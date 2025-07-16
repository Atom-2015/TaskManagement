import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async Thunk
export const addRevenue = createAsyncThunk(
  "addRevenue",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/revenue/Addrevenue", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add revenue"
      );
    }
  }
);

// Slice
const addRevenueSlice = createSlice({
  name: "addRevenue",
  initialState: {
    isError: false,
    isLoading: false,
    realData: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRevenue.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.realData = [];
        state.errorMessage = "";
      })
      .addCase(addRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to add revenue";
        state.realData = [];
      })
      .addCase(addRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.realData = action.payload;
        state.errorMessage = "";
      });
  },
});

export default addRevenueSlice.reducer;

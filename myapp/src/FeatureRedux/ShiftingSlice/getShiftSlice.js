import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to fetch shift data
export const getShift = createAsyncThunk(
  "get/shift",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/shift/getShift");
     
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shifts"
      );
    }
  }
);

// Slice
const getShiftSlice = createSlice({
  name: "getShift",
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
      .addCase(getShift.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })

      .addCase(getShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.getData = action.payload.data;
        state.isSuccess = true;
      })

      .addCase(getShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.getData = [];
        state.errorMessage = action.payload || "Failed to fetch shifts";
        state.isSuccess = false;
      });
  },
});

export default getShiftSlice.reducer;

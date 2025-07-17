import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to create a shift
export const createShift = createAsyncThunk(
  "shift/create",
  async (shiftData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/shift/create", shiftData);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create shift"
      );
    }
  }
);

// Slice
const createShiftSlice = createSlice({
  name: "createShift",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null,
    errorMessage: "",
  },

  reducers: {
    resetCreateShiftState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createShift.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      .addCase(createShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })

      .addCase(createShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to create shift";
        state.data = null;
      });
  },
});

export const { resetCreateShiftState } = createShiftSlice.actions;
export default createShiftSlice.reducer;

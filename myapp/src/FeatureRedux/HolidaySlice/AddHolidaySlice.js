// FeatureRedux/HolidaySlice/AddHolidaySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance"; 


export const AddHolidaycreate = createAsyncThunk(
  "holiday/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/holiday//singleHolday", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create holiday");
    }
  }
);

// Slice
const addHolidaySlice = createSlice({
  name: "addHoliday",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetAddHolidayState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.addData = null;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddHolidaycreate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(AddHolidaycreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addData = action.payload;
      })
      .addCase(AddHolidaycreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetAddHolidayState } = addHolidaySlice.actions;

export default addHolidaySlice.reducer;

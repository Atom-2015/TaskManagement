import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const AddholidayList = createAsyncThunk(
  "addholidayList",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/holiday/createHoliday", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

const AddholidayListSlice = createSlice({
  name: "addholidayList",
  initialState: {
    isError: false,
    isLoading: false,
    addData: [],
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddholidayList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(AddholidayList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.addData = action.payload.data || [];
        state.isSuccess = true;
      })
      .addCase(AddholidayList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || "Something went wrong";
        state.isSuccess = false;
      });
  },
});

export default AddholidayListSlice.reducer;

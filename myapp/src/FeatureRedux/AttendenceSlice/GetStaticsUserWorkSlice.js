import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk for fetching attendance statistics
export const GetStaticsUser = createAsyncThunk(
  "Attend/Static",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/attend/getStatic");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance statistics"
      );
    }
  }
);

// Slice
const GetStaticMonthSlice = createSlice({
  name: "GetStaticsUser",
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
      .addCase(GetStaticsUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetStaticsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(GetStaticsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default GetStaticMonthSlice.reducer;




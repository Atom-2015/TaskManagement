// ✅ REDUX SLICE (FeatureRedux/AttendenceSlice/GetSummaryAttendUserSlice.js)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ✅ Async thunk to fetch summary with month & year
export const GetSummaryUser = createAsyncThunk(
  "summary/user",
  async ({ month, year }, { rejectWithValue }) => {
    try {
     
      const response = await axiosInstance.get(
        `/api/attend/getSummary?month=${month}&year=${year}`
      );
     
      return response.data; // Should return an object with { success, month, summary, counts }
    } catch (error) {
     
      return rejectWithValue(
        error?.response?.data || "Something went wrong"
      );
    }
  }  
);

const GetSummarySlice = createSlice({
  name: "GetSummaryUser",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    getData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSummaryUser.pending, (state) => {
       
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetSummaryUser.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.isSuccess = true;
        state.getData = action.payload;
      })
      .addCase(GetSummaryUser.rejected, (state, action) => {
     
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
        action.payload?.message || "Something went wrong";
      });
  },
});

export default GetSummarySlice.reducer;

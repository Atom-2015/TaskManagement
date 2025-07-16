import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to fetch all leave data by company
export const getLeavebyCompany = createAsyncThunk(
  "companyLeave/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/leave/allleavedata");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch company leave data"
      );
    }
  }
);

                                    
const getLeaveByCompanySlice = createSlice({
  name: "getLeavebyCompany",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: "",
    getData: [],
  },
  reducers: {
     resetLeaveCompanyState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.getData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeavebyCompany.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(getLeavebyCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.getData = action.payload;
      })
      .addCase(getLeavebyCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload.message || "Something went wrong";
      });
  },
});



export const { resetLeaveCompanyState } = getLeaveByCompanySlice.actions;
export default getLeaveByCompanySlice.reducer;

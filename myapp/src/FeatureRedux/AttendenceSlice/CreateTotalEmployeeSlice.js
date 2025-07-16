import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const GetEmployeeTotal = createAsyncThunk(
  "attend/get",
  async (params = {}, { rejectWithValue }) => {
    try {
      let url = "/api/attend/getEmployee";
      const queryParams = [];

      if (params.date) {
        queryParams.push(`date=${params.date}`);
      } else if (params.month && params.year) {
        queryParams.push(`month=${params.month}&year=${params.year}`);
      }

      if (queryParams.length > 0) {
        url += "?" + queryParams.join("&");
      }

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee data"
      );
    }
  }
);



// ✅ Slice definition
const GetEmployeeTotalSlice = createSlice({
  name: "GetEmployeeTotal",
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
      .addCase(GetEmployeeTotal.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })

      .addCase(GetEmployeeTotal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload; 
      })

      .addCase(GetEmployeeTotal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default GetEmployeeTotalSlice.reducer;

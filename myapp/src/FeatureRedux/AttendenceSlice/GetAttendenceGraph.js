import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// ✅ Async Thunk to fetch attendance graph
export const GetTotalGraph = createAsyncThunk(
  "Graph/Attend",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/attend/getPresentCompany?month=${month}&year=${year}`);
      console.log("Graph API response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Graph API error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the attendance details"
      );
    }
  }
);

// ✅ Slice for storing and handling graph data
const GetPresentEmployeeSlice = createSlice({
  name: "GetTotalGraph",
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
      .addCase(GetTotalGraph.pending, (state) => {
        console.log("Fetching graph data...");
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(GetTotalGraph.fulfilled, (state, action) => {
        console.log("Graph data fetched:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.errorMessage = "";
      })
      .addCase(GetTotalGraph.rejected, (state, action) => {
        console.error("Failed to fetch graph data:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something is not right";
      });
  },
});

export default GetPresentEmployeeSlice.reducer;

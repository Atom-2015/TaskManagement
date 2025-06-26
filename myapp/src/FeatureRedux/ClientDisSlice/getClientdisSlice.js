import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async thunk to get all client discussions
export const getClientDis = createAsyncThunk(
  "getClientDis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/client/allClient"); // Should likely be GET, not POST
      

       console.log("Fetched data inside thunk:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch client discussions"
      );
    }
  }
);

const getClientDisSlice = createSlice({
  name: "getClientDis",
  initialState: {
    isError: false,
    isLoading: false,
    getData: null,
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(getClientDis.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })

      // Fulfilled
      .addCase(getClientDis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.getData = action.payload;
        state.isSuccess = true;
        state.errorMessage = "";

          console.log("✅ Slice received payload:", action.payload);

      })

      // Rejected
      .addCase(getClientDis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.getData = null;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch client discussions";
      });
  },
});

export default getClientDisSlice.reducer;

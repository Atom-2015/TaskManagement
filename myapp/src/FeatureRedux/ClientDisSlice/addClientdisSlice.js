import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async Thunk to POST client discussion
export const addClientDis = createAsyncThunk(
  "addClientDis",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/client/Addclient", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add client discussion"
      );
    }
  }
);

// Slice
const addClientDisSlice = createSlice({
  name: "addClientDis",
  initialState: {
    isError: false,
    isLoading: false,
    addData: null,
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Handle request pending
      .addCase(addClientDis.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })

      // Handle fulfilled
      .addCase(addClientDis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addData = action.payload;
        state.errorMessage = "";
      })

      // Handle rejected
      .addCase(addClientDis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.addData = null;
        state.errorMessage = action.payload || "Failed to add client discussion";
      });
  },
});

export default addClientDisSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk for deleting a single override
export const DelSingleOverrides = createAsyncThunk(
  "Delete/Overrides",
  async (overridesId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/holiday/del/${overridesId}`,overridesId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete override"
      );
    }
  }
);

// Slice for delete override state management
const DelSingleOverriedeSlice = createSlice({
  name: "delOverridesSingle",
  initialState: {
    isError: false,
    isLoading: false,
    delData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {
    resetDelOverrideState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.delData = null;
      state.errorMessage = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DelSingleOverrides.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(DelSingleOverrides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.delData = action.payload;
        state.errorMessage = "";
      })
      .addCase(DelSingleOverrides.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export const { resetDelOverrideState } = DelSingleOverriedeSlice.actions;

export default DelSingleOverriedeSlice.reducer;

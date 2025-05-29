import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Async Thunk for editing client discussion
export const editClientDis = createAsyncThunk(
  "editClientDis",
  async ({ clientId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/client/${clientId}`, data);
      return response.data; // Assuming the API returns { data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update client discussion"
      );
    }
  }
);

// Slice
const editClientDisSlice = createSlice({
  name: "editClientDis",
  initialState: {
    isError: false,
    isLoading: false,
    editData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(editClientDis.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(editClientDis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editData = action.payload;
      })
      .addCase(editClientDis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default editClientDisSlice.reducer;

// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to handle the update user API
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
        console.log('userid', userId , "updated Data", updatedData);
      const response = await axiosInstance.put(`/api/user/updateuser/${userId}`, updatedData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to update user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUpdating: false,
    updateSuccess: false,
    updateError: null,
  },
  reducers: {
    resetUpdateState(state) {
      state.isUpdating = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        state.updateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = false;
        state.updateError = action.payload;
      });
  },
});

export const { resetUpdateState } = userSlice.actions;

export default userSlice.reducer;

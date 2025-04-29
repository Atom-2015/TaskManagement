// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to handle the delete user API
export const deleteUser = createAsyncThunk(
  "user/deleteUser", // Action name is more descriptive now
  async ({ userId }, { rejectWithValue }) => {
    try {
      console.log("userId", userId);
      const response = await axiosInstance.delete(`/api/user/delete/${userId}`); // Changed to DELETE
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to delete user"
      );
    }
  }
);

const userDeleteSlice = createSlice({
  name: "user",
  initialState: {
    isDeleting: false,
    deleteSuccess: false, 
    deleteError: null,
    delUser:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isDeleting = true;
        state.deleteSuccess = false;
        state.deleteError = null;
        state.delUser=[]
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.deleteSuccess = true;
        state.deleteError = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteSuccess = false;
        state.deleteError = action.payload;
      });
  },
});

export const { resetDeleteState } = userDeleteSlice.actions; // Rename the action accordingly

export default userDeleteSlice.reducer;

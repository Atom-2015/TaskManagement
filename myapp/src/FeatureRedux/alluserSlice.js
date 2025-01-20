import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const allUser = createAsyncThunk(
  "allUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/user/userlist", formData);
      console.log("Ye response ka data hai ",response.data.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const AllUser = createSlice({
  name: "AllUser",
  initialState: {
    isError: false,
    isLoading: false,
    users: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.users = [];
        state.errorMessage = "";
      })
      .addCase(allUser.rejected, (state, action) => {
        state.users = [];
        state.errorMessage = action.payload || "Failed to fetch users";
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload; // Assuming response.data is the list of users
        state.errorMessage = "";
      });
  },
});

export default AllUser.reducer;

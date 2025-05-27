import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const addExpenceDiscussion = createAsyncThunk(
  "addExpenceDiscussion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/expense/AddexpenseDiscussion', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  }
);


const addExpenceDiscussionSlice = createSlice({
  name: "addExpenceDiscussion",
  initialState: {
    isError: false,
    isLoading: false,
    addData: [],
    errorMessage: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpenceDiscussion.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload || "Failed to add expense";
        state.addData = [];
      })

      .addCase(addExpenceDiscussion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.addData = [];
        state.errorMessage = "";
      })

      .addCase(addExpenceDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.addData = action.payload;
        state.errorMessage = "";
      })
  }
})

export default addExpenceDiscussionSlice.reducer;
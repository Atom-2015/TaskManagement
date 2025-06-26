import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk for editing an expense discussion
export const editExpenseDiscussion = createAsyncThunk(
  "editExpenseDiscussion",
  async ({ discussionId, projectId, updatedData }, { rejectWithValue }) => {
    try {
        
      const response = await axiosInstance.put(
        "/api/expenseDis/discussionId", // Adjust this path based on your API route
        updatedData,
        {
          headers: {
            "x-project-id": projectId,
            "x-discussion-id": discussionId,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit expense discussion"
      );
    }
  }
);

// Slice
const editExpenseDiscussionSlice = createSlice({
  name: "editExpenseDiscussion",
  initialState: {
    isLoading: false,
    isError: false,
    updatedData: null,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editExpenseDiscussion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(editExpenseDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.updatedData = action.payload;
        state.errorMessage = "";
      })
      .addCase(editExpenseDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to edit expense discussion";
      });
  },
});

export default editExpenseDiscussionSlice.reducer;

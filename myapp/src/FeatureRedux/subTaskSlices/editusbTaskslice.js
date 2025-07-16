import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
export const editsubtasklist = createAsyncThunk(
    "editsubtask/editsubtasklist",
    async ({ subtaskId, updatedData }, { rejectWithValue }) => {
        // console.log(`thisis sub task and data in reducer ${JSON.stringify(subtaskId)} , ${JSON.stringify(updatedData)}`)
      try {
        const response = await axiosInstance.put(
          `/api/subtask/Subtask/${subtaskId}`,
          updatedData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to edit sub task"
        );
      }
    }
  );
const editsubtasklistSlice=createSlice({
    name:"editsubtasklist",
    initialState:{
        isError:false,
        isLoading:false,
        data:[],
        errorMessage:"",
    },
    
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(editsubtasklist.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.data = [];
            state.errorMessage = "";
          })
          .addCase(editsubtasklist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || "Failed to show sub task";
            state.data = [];
          })
          .addCase(editsubtasklist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data= action.payload;
            state.errorMessage = "";
          });
      },
})

export default editsubtasklistSlice.reducer;
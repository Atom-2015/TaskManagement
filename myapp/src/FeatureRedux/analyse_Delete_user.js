import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const DeleteUser = createAsyncThunk(
    "DeleteUser",
    async (UserDelete, { rejectWithValue }) => {
      try {
        const response = await axios.delete("http://13.201.248.202:3001/api/delteuser", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            'x-delete-userid' : UserDelete 
          },
        });
        return response.data;
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || "An unexpected error occurred");
        }
        return rejectWithValue("An unexpected error occurred");
      }
    }
  );
  
  const analyseUpdateDeleteUser = createSlice({
    name: "AnalyseDeleteUserReducer",
    initialState: {
      isLoading: false,
      data: null,
      isError: false,
      errorMessage: "",
      UserDelete: [],
    },
    reducers: {
      // Optional: If you need a manual update function
      updateDeleteUser: (state, action) => {
        state.UserDelete = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(DeleteUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.errorMessage = "";
        })
        .addCase(DeleteUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.data = action.payload;
        })
        .addCase(DeleteUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.payload || "Failed to create Fast Inspaction";
        });
    },
  });
  
  export const { updateDeleteUser } = analyseUpdateDeleteUser.actions;
  
  export default analyseUpdateDeleteUser.reducer;
  
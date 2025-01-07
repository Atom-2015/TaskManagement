import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 
export const createuser = createAsyncThunk(
  "createuser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://13.201.248.202:3001/api/management/usermanagement", userData, {
        headers: {
          // 'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      return response.data;  
    } catch (error) {
       
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "An unexpected error occurred");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

 
const management_userCreation_slice = createSlice({
  name: 'user_creation',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "", 
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createuser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;  
      state.errorMessage = "";  
    });
    builder.addCase(createuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;  
    });
    builder.addCase(createuser.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isLoading = false;  
      state.isError = true;
      state.errorMessage = action.payload;   
    });
  },
});

 
export const { searchUser } = management_userCreation_slice.actions;

export default management_userCreation_slice.reducer;

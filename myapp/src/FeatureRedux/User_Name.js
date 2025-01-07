import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

export const getUserName = createAsyncThunk(
  "getUserName",
  async (NewUserDetail, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/username",  {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          
            // 'x-image-id':imageid
        },
      });
      console.warn(response.data , "The resonse is ")
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

const LoginNewUser = createSlice({
  name: "UserNameget",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
    NewUserDetail: [],
  },
  reducers: {
    // Optional: If you need a manual update function
    UpdateNewUser: (state, action) => {
      state.NewUserDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserName.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to create Fast Inspaction";
      });
  },
});

export const { UpdateNewUser } = LoginNewUser.actions;

export default LoginNewUser.reducer;

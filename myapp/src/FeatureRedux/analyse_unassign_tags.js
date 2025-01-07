
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

export const DeleteUser = createAsyncThunk(
    "unassigntags" , 
    async (removetags , {rejectWithValue})=>{
        try {
            const response = await axios.post('http://13.201.248.202:3001/api/tagimage/unassign', {imageid : removetags.images , tags:removetags.tags} , {
                headers:{
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem("token"),
                    'x-report-id': Cookies.get('reportId')
                }
            } );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || "An unexpected error occurred");
              }
              return rejectWithValue("An unexpected error occurred");
        }
    }
)


 const analyseUpdateUnassignTags = createSlice({
    name: "Analyse_unassign_tags",
    initialState: {
      isLoading: false,
      data: null,
      isError: false,
      issuscess:false,
      errorMessage: "",
      UserDelete: [],
    },
    reducers: {
      // Optional: If you need a manual update function
      UpdateUnassignTags: (state, action) => {
        state.UserDelete = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(DeleteUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.errorMessage = "";
          state.issuscess=false;
        })
        .addCase(DeleteUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.data = action.payload;
          state.issuscess=true;
        })
        .addCase(DeleteUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.issuscess = false;
          state.errorMessage = action.payload || "Failed to create Fast Inspaction";
        });
    },
  });
  
  export const { UpdateUnassignTags } = analyseUpdateUnassignTags.actions;
  
  export default analyseUpdateUnassignTags.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const CreateCheckInUser = createAsyncThunk(
  "add/checkIn",
  async (check_in_time_str, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/attend/create", {
        check_in_time: check_in_time_str,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add Check in"
      );
    }
  }
);


const CreateCheckInSlice=createSlice({
    name:"CreateCheckInUser",
    initialState:{
        isError:false,
        isLoading:false,
        addData:null,
        errorMessage:"",
        isSuccess:false,
    },

    reducers:{},

    extraReducers:(builder)=>{
        builder
            .addCase(CreateCheckInUser.pending, (state) =>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage="";
                state.isSuccess=false;
            })

            .addCase(CreateCheckInUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.addData=action.payload;
                state.errorMessage="";
            })

            .addCase(CreateCheckInUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.addData=null;
                state.errorMessage=action.payload || "failed to CraeteCheckInuser"
            })
    }
})

export default CreateCheckInSlice.reducer;
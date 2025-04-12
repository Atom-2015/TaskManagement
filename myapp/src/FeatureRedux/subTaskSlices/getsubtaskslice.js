import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const getsubtasklist =createAsyncThunk(
    "getsubtask/getsubtasklist",
    async(taskId,{rejectWithValue})=>{
        console.log(`we are in slice for subtask ${JSON.stringify(taskId)}`)
        try{
            const response=await axiosInstance.get("/api/subtask/getSub",{
                headers:{
                    'x-task-id':taskId.taskId
                }
            });
            return response.data
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Failed to show sub task"
              );
        }
    }
)

const getsubtasklistSlice=createSlice({
    name:"getsubtasklist",
    initialState:{
        isError:false,
        isLoading:false,
        data:[],
        errorMessage:"",
    },
    
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(getsubtasklist.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.data = [];
            state.errorMessage = "";
          })
          .addCase(getsubtasklist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload || "Failed to show sub task";
            state.data = [];
          })
          .addCase(getsubtasklist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data= action.payload;
            state.errorMessage = "";
          });
      },
})

export default getsubtasklistSlice.reducer;
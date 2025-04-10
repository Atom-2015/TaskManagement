import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const alltasks =createAsyncThunk(
    "addsubtask/subtaskform",
    async(_,{rejectWithValue}) => {
        try{
            const response = await axiosInstance.post("api/subtask/createSubtask",{
                headers:{
                    "x-project-id":localStorage.getItem("project_id"),
                    "x-task-id":localStorage.getItem('task_id')
                
                }
            });
            return response.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Failed to show sub task"
            )
        }
    }
);


const addsubtask =createSlice({
    name:"addsubtask",
    initialState:{
        isError: false,
        isLoading: false,
        data: [],
        errorMessage: "",
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(addsubtask.pending, (state) => {
                state.isLoading=true;
                state.isError=false;
                state.data=[];
                state.errorMessage = "";
            })

            .addCase(addsubtask.rejected,(state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to add subtask";
                state.data =[];
            })

            .addCase(addsubtask.fulfilled, (state,action) => {
                state.isLoading=false;
                state.isError=false;
                state.data=action.payload;
                state.errorMessage="";
            })
    }
})

export default addsubtask.reducer;
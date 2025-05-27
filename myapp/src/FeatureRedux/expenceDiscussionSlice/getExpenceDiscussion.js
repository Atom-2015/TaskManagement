import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const getExpenseDiscussion = createAsyncThunk (
    "getExpenseDiscussion",
    async ( projectId, {rejectWithValue}) =>{
        try{
            // console.log(`project id rahull :::: lolla ${JSON.stringify(projectId.projectId)}`);
            const response = await axiosInstance.get('/api/expense/AllexpenseDiscussion' , {
                headers: {
                    'x-project-id':projectId.projectId
                }
            } );
            console.log(response.data.data)
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "failed to fetch revenue data"
            );
        }
    }
);

const getExpenseDiscussionSlice = createSlice ({
    name:"getExpenseDiscussion",
    initialState: {
        isError: false,
        isLoading:false,
        getData:[],
        errorMessage: "",
        isSuccess: false,
    },
    reducers:{},
    extraReducers:( builder) =>{
        builder 
            .addCase(getExpenseDiscussion.pending, (state) =>{
                state.isLoading = true;
                state.isError = false;
                state.errorMessage="";
                state.isSuccess=false;
            } )

            .addCase(getExpenseDiscussion.fulfilled, (state,action) =>{
                state.isLoading= false;
                state.isError= false;
                state.getData = action.payload.data;
                state.isSuccess = true;
            })

            .addCase(getExpenseDiscussion.rejected, (state,action) =>{
                state.isLoading= false;
                state.isError = true;
                state.getData=[];
                state.errorMessage=action.payload || "failed to fetch expense data";
                state.isSuccess = false;
            });
    }
})

export default getExpenseDiscussionSlice.reducer;
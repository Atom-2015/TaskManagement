import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const getLeaveUser = createAsyncThunk(
    "getLeaveUser",  

    async(_,{rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("/api/leave/usergetleave")
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response ?.data || "failed to fetch the data"
            )
        }
    }
)

const getLeaveUserSlice = createSlice({
    name:"getLeaveUser",
        initialState:{
            isError:false,
            isLoading:false,
            getData:[],
            errorMessage:"",
            isSuccess:false, 
        },

        reducers:{},
        extraReducers:(builder) =>{
            builder
                .addCase(getLeaveUser.pending,(state)  =>{
                    state.isLoading =true;
                    state.isError=false;
                    state.errorMessage="";
                    state.isSuccess=false;
                })

                .addCase(getLeaveUser.fulfilled,(state,action) =>{
                    state.isLoading = false;
                    state.isError=false;
                    state.errorMessage="";
                    state.isSuccess=false;
                    state.getData=action.payload;
                })

                .addCase(getLeaveUser.rejected,(state,action) =>{
                    state.isLoading=false;
                    state.isError=true;
                    state.errorMessage=action.payload.message || "Something went wrong";
                    state.isSuccess=false;
                })
        }
})

export default getLeaveUserSlice.reducer;
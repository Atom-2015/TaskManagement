import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const CreateCheckOut=createAsyncThunk(
    "Add/checkout",
    async(check_out_time,{rejectWithValue}) => {
        try{

            const response = await axiosInstance.post("/api/attend/checkout",{check_out_time});
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "failed to add CheckOut disccussuin"
            )
        }
    }
)





const CreateCheckOutSlice = createSlice({
    name:"CreateCheckOut",
    initialState:{
        isError:false,
        isLoading:false,
        addData:null,
        errorMessage:"",
        isSuccess:false,
    },

    reducers:{},

    extraReducers:(builder) =>{
        builder
            .addCase(CreateCheckOut.pending,(state) =>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage="";
                state.isSuccess=false;
            })

            .addCase(CreateCheckOut.fulfilled, (state,action) =>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.addData=action.payload;
                state.errorMessage="";
            })

            .addCase(CreateCheckOut.rejected,(state,action) =>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.addData=null;
                state.errorMessage=action.payload || "failled to add checkOUt"
            })
    }
})

export default CreateCheckOutSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const GetReportAttendence = createAsyncThunk(
    "Report/Get",
    async({month,year},{rejectWithValue})=>{
        try{
            const response= await axiosInstance.get(`/api/attend//getAllAttend?month=${month}&year=${year}`);
            return response.data;
        }
        catch(error){
            return rejectWithValue(error?.response?.data || "Something went Wrong")
        }
    }
)

const GetReportAttendenceSlice=createSlice({
    name:"GetReportAttendence",
    initialState:{
        isLoading:false,
        isError:false,
        isSuccess:false,
        errorMessage:"",
        getData:null,

    },

    reducers:{},

    extraReducers:(builder) =>{
        builder
            .addCase(GetReportAttendence.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage="";
                state.isSuccess=false;
            })

           .addCase(GetReportAttendence.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.getData = action.payload;
})
.addCase(GetReportAttendence.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.errorMessage = action.payload?.message || action.payload || "Something went Wrong";
})
    }
})

export default GetReportAttendenceSlice.reducer;
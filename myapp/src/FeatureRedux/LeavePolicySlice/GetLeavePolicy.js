import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const GetLeavePolicy=createAsyncThunk(
    "GetLeavePolicy",
    async(_,{rejectWithValue})=>{
        try{
            const response= await axiosInstance.get("api/leave/LeavePolicy")
            console.log("GetLeavePolicy response:", response.data)
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch get Policy"
            )
        }
    }
)

const GetLeavePolicySlice = createSlice({
    name: "GetLeavePolicy",
    initialState: {
        isError: false,
        isLoading: false,
        getData: [],
        errorMessage: "",
        isSuccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {           
        builder
            .addCase(GetLeavePolicy.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = "";
                state.isSuccess = false;
            })
            .addCase(GetLeavePolicy.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.getData = action.payload;
                state.isSuccess = true;
            })
            .addCase(GetLeavePolicy.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.getData = [];
                state.errorMessage = action.payload || "Failed to fetch leave policy data";
                state.isSuccess = false;
            });
    }
});

export default GetLeavePolicySlice.reducer;
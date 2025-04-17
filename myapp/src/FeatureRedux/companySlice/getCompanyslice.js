import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { addCompany } from "./addCompanyslice";

export const getCompany= createAsyncThunk(
        "getAllcompany", 
        async(_,{rejectWithValue}) => {
            try{
                const response = await axiosInstance.get("/api/company/allcompany",{})
                return response.data
            }
            catch(error){
                return rejectWithValue(
                    error.response?.data?.message || "failed to show get comp"
                )
            }
        }
)


const getCompanySlice=createSlice({
    name:"CompanyGetAll",
    initialState:{
        isError:false,
        isLoading:false,
        data:[],
        errorMessage:""
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getCompany.pending, (state)=>{
                state.isLoading=true;
                state.isError=false;
                state.data=[];
                state.errorMessage="";
            })

            .addCase(getCompany.rejected, (state,action) => {
                state.isLoading=false;
                state.isError=true;
                state.errorMessage=action.payload || "Failed to get company";
                state.data=[];
            })

            .addCase(getCompany.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError=false;
                state.data=action.payload;
                state.errorMessage="";
            })
    }
})

export default getCompanySlice.reducer;
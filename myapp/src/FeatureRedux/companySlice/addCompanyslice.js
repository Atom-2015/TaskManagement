import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { act } from "react";

export const addCompany=createAsyncThunk(
    "createcompany/addcompanyform",  
    async(formData,{rejectWithValue}) =>{
        try{
            const response = await axiosInstance.post("/api/company/addCompany", formData,{})
            return response.data
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "failed to show addcompany"
            )
        }
    }
)

const addCompanySlice=createSlice({
    name:"addcompanyform",
    initialState:{
        isError: false,
        isLoading:false,
        data:[],
        errorMessage:"",
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCompany.pending, (state) => {
                state.isLoading =true;
                state.isError=false;
                state.data=[];
                state.errorMessage="";
            })

            .addCase(addCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.isError=true;
                state.errorMessage=action.payload || "failed to add company";
                state.data=[];
            })

            .addCase(addCompany.fulfilled, (state,action) => {
                state.isLoading =false;
                state.isError=false;
                state.data=action.payload;
                state.errorMessage="";
            })
    }
})

export default addCompanySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { act } from "react";

export const editCompany = createAsyncThunk(
    "editcompanysect/editCompanyForm",
    async (formData, { rejectWithValue }) => {
      try {
        const companyId = formData._id;
        const response = await axiosInstance.put(`/api/company/${companyId}`, formData);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to edit company"
        );
      }
    }
  );
  
const editCompanySlice=createSlice({
    name:"editCompanyForm",
    initialState:{
        isError: false,
        isLoading:false,
        edit:[],
        errorMessage:"",
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editCompany.pending, (state) => {
                state.isLoading =true;
                state.isError=false;
                state.edit=[];
                state.errorMessage="";
            })

            .addCase(editCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.isError=true;
                state.errorMessage=action.payload || "failed to add company";
                state.edit=[];
            })

            .addCase(editCompany.fulfilled, (state,action) => {
                state.isLoading =false;
                state.isError=false;
                state.edit=action.payload;
                state.errorMessage="";
            })
    }
})

export default editCompanySlice.reducer;

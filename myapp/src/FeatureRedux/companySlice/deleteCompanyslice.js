import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { act } from "react";

export const delCompany = createAsyncThunk(
    "delcompanysect/delCompanyForm",
    async (formData, { rejectWithValue }) => {
      try {
        const companyId = formData._id;
        const response = await axiosInstance.delete(`/api/company/${companyId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to edit company"
        );
      }
    }
  );
  
const deleteCompanySlice=createSlice({
    name:"delCompanyForm",
    initialState:{
        isError: false,
        isLoading:false,
        del:[],
        errorMessage:"",
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(delCompany.pending, (state) => {
                state.isLoading =true;
                state.isError=false;
                state.edit=[];
                state.errorMessage="";
            })

            .addCase(delCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.isError=true;
                state.errorMessage=action.payload || "failed to add company";
                state.edit=[];
            })

            .addCase(delCompany.fulfilled, (state,action) => {
                state.isLoading =false;
                state.isError=false;
                state.edit=action.payload;
                state.errorMessage="";
            })
    }
})

export default deleteCompanySlice.reducer;

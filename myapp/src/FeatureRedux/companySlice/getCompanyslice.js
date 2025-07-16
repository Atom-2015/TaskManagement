import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { addCompany } from "./addCompanyslice";

export const getCompany = createAsyncThunk(
    "getAllcompany",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/api/company/allcompany");
        console.log(response.data)
        return response.data;
        
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "failed to show get comp"
        );
      }
    }
  );
  

const getCompanySlice=createSlice({
    name:"CompanyGetAll",
    initialState:{
        isError:false,
        isLoading:false,
        data1:[],
        errorMessage:"",
        isSuccess : false
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getCompany.pending, (state)=>{
                state.isLoading=true;
                state.isError=false;
                state.data1=[];
                state.errorMessage="";
                state.isSuccess = false
            })

            .addCase(getCompany.rejected, (state,action) => {
                state.isLoading=false;
                state.isError=true;
                state.errorMessage=action.payload || "Failed to get company";
                state.data1=[];
                state.isSuccess = false
            })

            .addCase(getCompany.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError=false;
                state.data1=action.payload.data;
                state.errorMessage="";
                state.isSuccess = true
            })
    }
})

export default getCompanySlice.reducer;
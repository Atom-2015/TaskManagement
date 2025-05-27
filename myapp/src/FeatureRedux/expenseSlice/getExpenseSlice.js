import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const getExpense = createAsyncThunk (
    "getExpense",
    async ( _, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.get('/api/expense/Allexpense');
            return response.data.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "failed to fetch revenue data"
            );
        }
    }
);

const getExpenseSlice = createSlice ({
    name:"getExpense",
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
            .addCase(getExpense.pending, (state) =>{
                state.isLoading = true;
                state.isError = false;
                state.errorMessage="";
                state.isSuccess=false;
            } )

            .addCase(getExpense.fulfilled, (state,action) =>{
                state.isLoading= false;
                state.isError= false;
                state.getData = action.payload;
                state.isSuccess = true;
            })

            .addCase(getExpense.rejected, (state,action) =>{
                state.isLoading= false;
                state.isError = true;
                state.getData=[];
                state.errorMessage=action.payload || "failed to fetch expense data";
                state.isSuccess = false;
            });
    }
})

export default getExpenseSlice.reducer;
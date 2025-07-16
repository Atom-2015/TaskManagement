import { createAsyncThunk,createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const addExpense = createAsyncThunk(
  "addExpense",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/expense/Addexpense', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  }
);


const addExpenseSlice = createSlice ({
    name :"addExpense",
    initialState:{
        isError : false,
        isLoading: false,
        addData:[],
        errorMessage:"",
    },

    reducers:{},
    extraReducers: (builder) => {
        builder 
                .addCase(addExpense.rejected, (state, action) => {
                    state.isError= true;
                    state.isLoading= false;
                    state.errorMessage = action.payload || "Failed to add expense";
                    state.addData=[];
                })

                .addCase(addExpense.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                    state.addData =[];
                    state.errorMessage ="";
                })

                .addCase(addExpense.fulfilled,(state,action) =>{
                    state.isLoading = false;
                    state.isError=false;
                    state.addData = action.payload;
                    state.errorMessage="";
                })
    }
})

export default addExpenseSlice.reducer;
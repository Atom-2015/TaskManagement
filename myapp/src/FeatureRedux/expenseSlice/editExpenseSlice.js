import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";


export const editExpense = createAsyncThunk (
    "editExpense",
    async ({expenseId, updateData},{rejectWithValue}) => {
        try{
            const response = await axiosInstance.put(`/api/expense/${expenseId}`,updateData);
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response ?. data ?.message || "failed to edit "
            );
        }
    }
)

const editExpenseSlice = createSlice ({
    name:"editExpense",
    initialState: {
        isError: false,
        isLoading: false,
        isSuccess:false,
        editData: [],
        errorMessage:"",
    },

    reducers :{},
    extraReducers: (builder) => {
        builder 
                 .addCase(editExpense.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.editData = null;
      })

      .addCase(editExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.editData = null;
        state.errorMessage = action.payload || "Failed to edit";
      })

      .addCase(editExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.editData = action.payload;
        state.errorMessage = "";
      });
            },
})

export default editExpenseSlice.reducer;
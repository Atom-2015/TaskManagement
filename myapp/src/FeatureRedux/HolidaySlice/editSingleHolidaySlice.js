import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";



export const editHoliday = createAsyncThunk(
    "editHoliday",
    async ({holidayId,formData},{rejectWithValue}) => {
        try{
            const response = await axiosInstance.put(`/api/holiday/holiday/${holidayId}`,formData)
            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Failed to edit"
            )
        }
    }
)


const editHolidaySlice = createSlice({
    name: "editHoliday",
    initialState:{
        isError:false,
        isLoading:false,
        editData:[],
        errorMessage:"",
    },

    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(editHoliday.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.editData=[];
                state.errorMessage="";
            })

            .addCase(editHoliday.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.errorMessage=action.payload || "failed to edit";
                state.editData=[];
            })

            .addCase(editHoliday.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.editData=action.payload;
                state.errorMessage="";
            })
    }

})

export default editHolidaySlice.reducer;
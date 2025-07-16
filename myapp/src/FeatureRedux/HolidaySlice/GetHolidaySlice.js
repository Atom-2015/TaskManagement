import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const getHolidayList = createAsyncThunk(
    "getHolidayList",
    async(_,{rejectWithValue}) =>{
        try{
            //console.log("api hitted")
            const response  = await axiosInstance.get("/api/holiday/getHoliday")
            //console.log("ye data",response.data)
            return response.data;
            

        }catch(error){
            return rejectWithValue (error?.response?.data || "failed to fetech data")
        }
    }
)

const getHolidayListSlice = createSlice({
    name:"getHolidayList",
    initialState:{
        isError:false,
        isLoading:false,
        getData:[],
        errorMessage:"",
        isSuccess:false,
    },

    reducers: {},

    extraReducers: (builder) =>{
        builder
            .addCase(getHolidayList.pending, (state) =>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage = "";
                state.isSuccess=false;
            })

            .addCase(getHolidayList.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.getData=action.payload?.data || [];
                state.isSuccess=true;
            })

            .addCase(getHolidayList.rejected,(state,action) =>{
                state.isLoading=false;
                state.isError=true;
                state.errorMessage=action.payload?.message || "Something went wrong";
                state.isSuccess=false;
            })
    }
})

export default getHolidayListSlice.reducer;
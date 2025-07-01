import { buildCreateSlice, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance"; 


export const AddOverridesCreate = createAsyncThunk(
    "Add/Overrides",

    async(formData,{rejectWithValue}) =>{
        try{
           const response = await axiosInstance.post("/api/holiday/addOverrides",formData)
            return response.data;
        }
        
        catch(error){
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Failed to create Special Date")
        }
    }
)

const addOverrideSlice = createSlice({
    name:"addOverrides",
    initialState:{
        isError:false,
        isLoading:false,
        addData:null,
        errorMessage:"",
        isSuccess:false,
    },

    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(AddOverridesCreate.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage="";
                state.isSuccess=false;
            })

            .addCase(AddOverridesCreate.fulfilled,(state,action) => {
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.addData=action.payload;
            })

            .addCase(AddOverridesCreate.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.errorMessage=action.payload;
            })
    }
})

export default addOverrideSlice.reducer;

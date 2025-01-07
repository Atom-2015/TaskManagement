import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const createCompany = createAsyncThunk("createCompany",
    async(companydata , {rejectwithvalue})=>{
     try {
        //api key check kar lo
        const response = await axios.post("http://13.201.248.202:3001/api/management/" , companydata , {
            headers:{
                'x-auth-token' : localStorage.getItem('token'),
                
            }
        });
        return response.data;
     } catch (error) {
        if (error.response && error.response.data) {
            return rejectwithvalue(error.response.data.message || "An unexpected error occurred");
          }
          return rejectwithvalue("An unexpected error occurred");
     }
    }
);



const management_company_slice = createSlice({
    name: 'company_creation',
    initialState:{
        isLoading:false,
        data:null,
        isError: false,
        errorMessage:"", 
        companydata:[],
    },
    reducers:{
        createCompany1:(state , action)=>{
            console.log(action.payload);
            state.companydata = action.payload            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createCompany.pending , (state)=>{
            state.isLoading(true);
            state.isError(false);
            state.errorMessage = "";
        });
        builder.addCase(createCompany.fulfilled ,(state)=>{
            state.isLoading(false);
            state.isError(false);
            state.data = action.payload
        });
        builder.addCase(createCompany.rejected , (state)=>{
            state.isLoading(false);
            state.isError(true);
            state.errorMessage = action.payload
        });
    }
});

export const {createCompany1} = management_company_slice.actions;

export default management_company_slice.reducer;



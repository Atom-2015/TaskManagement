import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dataofcompanyid = '';
export const DeleteCompany = createAsyncThunk(
  "DeleteCompany",
  async (Companydata, { rejectWithValue }) => {
    try {
        console.log(`This is company data ${Companydata}`);
        const companyId = Companydata
        // dataofcompanyid = Companydata;
      const response = await axios.post("/api/management/deletecompany", Companydata, {
        headers: {
          // 'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
          'x-company-id': companyId
        },
      });
      return response.data;  
    } catch (error) {
       
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "An unexpected error occurred");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

 
const management_delete_company = createSlice({
  name: 'delete_Company',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "", 
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(DeleteCompany.pending, (state) => {
      state.isLoading = true;
      state.isError = false;  
      state.errorMessage = "";  
    });
    builder.addCase(DeleteCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;  
    });
    builder.addCase(DeleteCompany.rejected, (state, action) => {
      console.log("Error:", action.payload);
      state.isLoading = false;  
      state.isError = true;
      state.errorMessage = action.payload;   
    });
  },
});

 
export const { searchUser } = management_delete_company.actions;

export default management_delete_company.reducer;

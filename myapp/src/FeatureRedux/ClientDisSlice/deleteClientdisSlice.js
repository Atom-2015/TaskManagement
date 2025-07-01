import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const delClientDis = createAsyncThunk(
        "delClientDis",
        async(clientId, {rejectWithValue}) => {
            try{
             
                const response = await axiosInstance.delete(`/api/client/${clientId}`)
                return response.data;
            }
            catch(error){
                return rejectWithValue(
                    error.response ?. data ?.message || "failed top delete"
                )
            }
        }
)
const delClientDisSlice = createSlice({
  name: "delClientDis",
  initialState: {
    isError: false,
    isLoading: false,
    delData: null,
    errorMessage: "",
    isSuccess: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(delClientDis.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })
      .addCase(delClientDis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.delData = action.payload;
        state.isSuccess = true;
      })
      .addCase(delClientDis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Unknown error occurred";
        state.isSuccess = false;
      });
  },
});

export default delClientDisSlice.reducer;

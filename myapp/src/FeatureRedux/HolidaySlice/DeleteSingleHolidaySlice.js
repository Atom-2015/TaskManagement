// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";


// export const DelSingleHoliday = createAsyncThunk(
//     "delHolidaySingle",
//     async(holidayId  ,{rejectWithValue}) => {
//         try{
          
//            const response = await axiosInstance.delete(`/api/holiday/holiday/${holidayId}`)
//             return response.data;
//         }
//         catch(error){
//             console.log(error)
//             return rejectWithValue(
//                 error.response?.data?.message || "Failed to delete holiday section"
//             )
//         }
//     }
// )

// const DelSingleHolidaySlice= createSlice ({
//     name:"delHolidaySingle",
//     initialState: {
//         isError:false,
//         isLoading:false,
//         delData: null,
//         errorMessage:"",
//         isSuccess:false,
//     },
//     reducers:{},

//     extraReducers: (builder) =>{
//         builder
//             .addCase(DelSingleHoliday.pending, (state) =>{
//                 state.isLoading=true;
//                 state.isError=false;
//                 state.errorMessage="";
//                 state.isSuccess=false;
//             })

//             .addCase(DelSingleHoliday.fulfilled,(state,action)=>{
//                 state.isLoading=false;
//                 state.delData=action.payload;
//                 state.isSuccess=true;
//             })

//             .addCase(DelSingleHoliday.rejected,(state,action) =>{
//                 state.isLoading=false;
//                 state.isError=true;
//                 state.errorMessage=action.payload || "Unkonown error occured";
//                 state.isSuccess=false;
//             })
//     }
// })

// export default DelSingleHolidaySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Thunk to delete a single holiday by ID
export const DelSingleHoliday = createAsyncThunk(
  "delHolidaySingle",
  async (holidayId, { rejectWithValue }) => {
    try {
      console.info(`Sending DELETE request for holidayId: ${holidayId}`);
      const response = await axiosInstance.delete(`/api/holiday/holiday/${holidayId}`);
      console.info("DELETE response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting holiday:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete holiday section"
      );
    }
  }
);

// Initial state with all possible status flags
const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  delData: null,
  errorMessage: "",
  status: "idle", // idle | loading | succeeded | failed
  lastDeletedId: null,
  deletedAt: null,
};

// Create the slice
const DelSingleHolidaySlice = createSlice({
  name: "delHolidaySingle",
  initialState,
  reducers: {
    // Reset state to default
    resetDelHolidayState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.delData = null;
      state.errorMessage = "";
      state.status = "idle";
      state.lastDeletedId = null;
      state.deletedAt = null;
      console.info("Delete holiday state reset.");
    },

    // Optional: force set data externally (useful for testing/dev tools)
    setDelHolidayManually: (state, action) => {
      state.delData = action.payload.data || null;
      state.lastDeletedId = action.payload.id || null;
      state.deletedAt = new Date().toISOString();
      state.isSuccess = true;
      state.status = "succeeded";
      console.warn("Manually set deleted holiday:", action.payload);
    }
  },

  extraReducers: (builder) => {
    builder
      // When deletion starts
      .addCase(DelSingleHoliday.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
        state.status = "loading";
        state.delData = null;
        state.lastDeletedId = null;
        console.debug("Deleting holiday... pending.");
      })

      // When deletion is successful
      .addCase(DelSingleHoliday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = "succeeded";
        state.delData = action.payload;
        state.lastDeletedId = action.payload?._id || null;
        state.deletedAt = new Date().toISOString();
        console.debug("Holiday deleted successfully:", action.payload);
      })

      // When deletion fails
      .addCase(DelSingleHoliday.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.status = "failed";
        state.errorMessage = action.payload || "Unknown error occurred";
        state.isSuccess = false;
        state.delData = null;
        console.error("Failed to delete holiday:", action.payload);
      });
  }
});

// Export the reducer
export default DelSingleHolidaySlice.reducer;

// Export extra actions
export const {
  resetDelHolidayState,
  setDelHolidayManually,
} = DelSingleHolidaySlice.actions;

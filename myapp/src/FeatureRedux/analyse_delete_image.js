// import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie'
// import axios from 'axios';


// export const deleteImage = createAsyncThunk("deleteImage" , async (imagedata , {rejectwithvalue} )=>{
//     try {
//         const response = await axios.delete("/api/main/deleteImage",{
//             headers: {
//               "x-auth-token": localStorage.getItem("token"),
//               'x-image-id' : imagedata.imageId,
//               'x-report-id' :Cookies.get('reportId')
//                 // 'x-image-id':imageid
//             },
//             params:{
//                 index :imagedata.index,
//                 id:imagedata.imageId
//             }
//           });
//           return response.data;
//     } catch (error) {
//         if(error.response && error.response.data ){
//             return rejectwithvalue(error.response.data.message ||  "An unexpected error occurred")
//         }
//         return rejectwithvalue( "An unexpected error occurred")
//     }
// });


// const analyseDeleteImageSlice = createSlice({
//     name:"ImageDelete",
//     initialState:{
//         isLoading:false,
//         data:null,
//         isError:false,
//         errorMessage:"",
//         isDeleted:false,
//         imagedata:[],
         
//     },
//     reducers:{
//         updateImageDelete:(state ,action)=>{
//             state.imagedata = action.payload;
//         },
//     },
//     extraReducers:(builder)=>{
//         builder
//           .addCase(deleteImage.pending , (state)=>{
//             state.isLoading = true;
//             state.isError = false;
//             state.isDeleted = null;
//             state.errorMessage= "";
             
//           })
//           .addCase(deleteImage.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.isDeleted = true;
//             state.data = action.payload;
//           })
//           .addCase(deleteImage.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isDeleted = false;
//             state.isError = true;
//             state.errorMessage = action.payload || "Failed to create Fast Inspaction";
//           });
//     }
// })


// export const {updateImageDelete} = analyseDeleteImageSlice.actions;

// export default analyseDeleteImageSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const deleteImage = createAsyncThunk(
  "deleteImage",
  async (imagedata, { rejectWithValue }) => {
    try {
      const response = await axios.delete("http://13.201.248.202:3001/api/main/deleteImage", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "x-image-id": imagedata.imageId,
          "x-report-id": Cookies.get("reportId"),
        },
        params: {
          index: imagedata.index,
          id: imagedata.imageId,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "An unexpected error occurred"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const analyseDeleteImageSlice = createSlice({
  name: "ImageDelete",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
    isDeleted: false,
    imagedata: [], // Holds updated state
    lastResponse: null, // New field to hold the latest API response
  },
  reducers: {
    updateImageDelete: (state, action) => {
      state.imagedata = action.payload;
    },
    resetDeleteState: (state) => {
      // Optional: Reset the delete state
      state.isDeleted = false;
      state.isError = false;
      state.errorMessage = "";
      state.lastResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isDeleted = null;
        state.errorMessage = "";
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isDeleted = true;
        state.data = action.payload;

        // Store the response for external access
        state.lastResponse = action.payload;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to create Fast Inspection";
      });
  },
});

export const { updateImageDelete, resetDeleteState } =
  analyseDeleteImageSlice.actions;

export default analyseDeleteImageSlice.reducer;

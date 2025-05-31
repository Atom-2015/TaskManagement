import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const deleteExpenceDiscussion = createAsyncThunk(
  "deleteExpenceDiscussion",
  async ({ discussionid, projectId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/api/expense/deletediscussionid', {
        headers: {
          'x-project-id': projectId,
          'x-discussion-id': discussionid
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete expense discussion"
      );
    }
  }
);

const deleteExpenceDiscussionslice = createSlice({
  name: "deleteExpenceDiscussion",
  initialState: {
    isError: false,
    isLoading: false,
    addData: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteExpenceDiscussion.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteExpenceDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.addData = action.payload;
        state.errorMessage = "";
      })
      .addCase(deleteExpenceDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to delete expense discussion";
      });
  }
});

export default deleteExpenceDiscussionslice.reducer;

// import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
// import axiosInstance from "../../axiosInstance";

// export const deleteExpenceDiscussion = createAsyncThunk(
//   "addExpenceDiscussion",
//   async ({discussionid , projectId}, { rejectWithValue }) => {
//     try {
//       // console.log("project id ",JSON.stringify(projectId))
//       const response = await axiosInstance.delete('/api/expense/deletediscussionid' , {
//         headers: {
          
//           'x-project-id':projectId,
//           "x-discussion-id" : discussionid
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to delete expense"
//       );
//     }
//   }
// );


// const deleteExpenceDiscussionslice = createSlice({
//   name: "deleteExpenceDiscussion",
//   initialState: {
//     isError: false,
//     isLoading: false,
//     addData: [],
//     errorMessage: "",
//   },

//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(deleteExpenceDiscussion.rejected, (state, action) => {
//         state.isError = true;
//         state.isLoading = false;
//         state.errorMessage = action.payload || "Failed to add expense";
//         state.addData = [];
//       })

//       .addCase(deleteExpenceDiscussion.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.addData = [];
//         state.errorMessage = "";
//       })

//       .addCase(deleteExpenceDiscussion.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.addData = action.payload;
//         state.errorMessage = "";
//       })
//   }
// })

// export default deleteExpenceDiscussionslice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";



// Thunk to add or update leave policy
export const addLeavePolicy = createAsyncThunk(
  "leavePolicy/addLeavePolicy",
  async (leaves, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/leave/leave", { leaves });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add leave policy");
    }
  }
);

const leavePolicySlice = createSlice({
  name: "addLeavePolicy",
  initialState: {
    loading: false,
    error: null,
    leaves: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    

      .addCase(addLeavePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLeavePolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload?.data?.leaves || [];
      })
      .addCase(addLeavePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leavePolicySlice.reducer;

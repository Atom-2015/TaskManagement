import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance'; // your configured axios with baseURL and interceptors

// Async thunk to delete a leave type
export const deleteLeavePolicy = createAsyncThunk(
  'leavePolicy/delete',
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/leave/delete-policy?type=${type}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const deleteLeavePolicySlice = createSlice({
  name: 'deleteleavePolicy',
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: '',
  },
  reducers: {
    resetDeleteStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLeavePolicy.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteLeavePolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deleteLeavePolicy.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to delete leave policy';
      });
  },
});

export const { resetDeleteStatus } = deleteLeavePolicySlice.actions;
export default deleteLeavePolicySlice.reducer;

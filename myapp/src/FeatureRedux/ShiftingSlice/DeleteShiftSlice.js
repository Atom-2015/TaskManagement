// FeatureRedux/ShiftingSlice/DeleteShiftSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';


// Async thunk for deleting a shift
export const deleteShift = createAsyncThunk(
  'shift/deleteShift',
  async (shiftId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/shift/${shiftId}`);
      return { shiftId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete shift");
    }
  }
);

const deleteShiftSlice = createSlice({
  name: 'deleteShift',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    deletedShiftId: null,
  },
  reducers: {
    resetDeleteShift: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.deletedShiftId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteShift.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedShiftId = action.payload.shiftId;
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetDeleteShift } = deleteShiftSlice.actions;
export default deleteShiftSlice.reducer;

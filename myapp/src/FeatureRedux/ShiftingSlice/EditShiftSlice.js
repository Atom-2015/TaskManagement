import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

// ✅ Async thunk to edit/update a shift
export const editShift = createAsyncThunk(
  'shift/editShift',
  async ({ shiftId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/shift/${shiftId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update shift'
      );
    }
  }
);

const editShiftSlice = createSlice({
  name: 'editShift',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    updatedShift: null,
  },
  reducers: {
    resetEditShift: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.updatedShift = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editShift.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(editShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedShift = action.payload.data; // adjust this based on your backend response
      })
      .addCase(editShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetEditShift } = editShiftSlice.actions;
export default editShiftSlice.reducer;

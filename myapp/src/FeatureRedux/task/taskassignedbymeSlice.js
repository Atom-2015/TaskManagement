import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

// Thunk to fetch tasks assigned by the user
export const assigned_by = createAsyncThunk(
  "tasks/assigned_by",
  
  async (_, { rejectWithValue }) => {
    try {
      
 
      const response = await axiosInstance.get('/api/task/taskassignedby');
   
      return response.data.data; // Ensure your backend sends data here
  
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch assigned tasks'
      );
    }
  }
);

// Slice for tasks created by the user
const alltaskcreatedbyme = createSlice({
  name: 'taskscreatedbyme',
  initialState: {
    isError: false,
    isLoading: false,
    task: [],
    errorMessage: '',
  },
  reducers: {}, // If no reducers are needed, leave this empty
  extraReducers: (builder) => {
    builder
      .addCase(assigned_by.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.task = [];
        state.errorMessage = '';
      })
      .addCase(assigned_by.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Failed to fetch assigned tasks';
      })
      .addCase(assigned_by.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.task = action.payload || [];
        state.errorMessage = '';
      });
  },
});

export default alltaskcreatedbyme.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

// Async thunk to add a user
export const addUser = createAsyncThunk(
  'addUser', // Action type
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/user/adduser', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data; // Assuming the API returns the user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create user'
      );
    }
  }
);

const AddUser = createSlice({
  name: 'AddUser', // Slice name
  initialState: {
    isError: false,
    isLoading: false, // Use camelCase for consistency
    users: [],
    errorMessage: '', // Corrected typo
  },
  reducers: {}, // Explicitly specify an empty reducers object
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.users = [];
        state.errorMessage = '';
      })
      .addCase(addUser.rejected, (state, action) => {
        state.users = [];
        state.errorMessage = action.payload || 'Failed to add user';
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = [action.payload];
        state.errorMessage = '';
      });
  },
});

export default AddUser.reducer;

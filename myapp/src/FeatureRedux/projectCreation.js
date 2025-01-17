import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

// Async thunk to add a project
export const AddProject = createAsyncThunk(
  'addproject',
  async (formData, { rejectWithValue }) => {
    try {
      // Send a POST request to the backend API
      const response = await axiosInstance.post('/api/project/addproject', formData);
      return response.data; // Assuming response contains all projects
    } catch (error) {
      console.error('Error adding project:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create project'
      );
    }
  }
);

// Slice to manage project state
const projectcreationSlice = createSlice({
  name: 'Project_Addition',
  initialState: {
    counter: 0,
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: '',
    isAdded: false,
    projects: [], // Holds all projects
    lastResponse: null,
  },
  reducers: {
    // Counter reducer (optional functionality)
    addcount: (state) => {
      state.counter += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddProject.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
        state.isAdded = false;
      })
      .addCase(AddProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isAdded = true;
        state.projects = action.payload.projects || []; // Overwrite projects array with updated data
        state.lastResponse = action.payload; // Store the entire response
      })
      .addCase(AddProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Failed to add project';
        state.isAdded = false;
      });
  },
});

// Exporting actions and reducer
export const { addcount } = projectcreationSlice.actions;
export default projectcreationSlice.reducer;

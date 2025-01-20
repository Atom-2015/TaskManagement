import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Async Thunk to Add Task
export const addtask = createAsyncThunk(
    'additionoftask',
    async (taskdata, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/task/createTask', taskdata, {
                headers: {
                    'x-project-id':localStorage.getItem('Projectid')
                }
            });
            return response.data;  // Ensure the data is returned here
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create task'
            );
        }
    }
);

// Slice for Task Management
const additiontask = createSlice({
    name: 'Addtask',
    initialState: {
        isError: false,
        isLoading: false,
        task: [],
        errorMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addtask.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.task = [];
                state.errorMessage = '';
            })
            .addCase(addtask.rejected, (state, action) => {
                state.task = [];
                state.errorMessage = action.payload || 'Failed to add task';
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addtask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.task = [action.payload];  // Assuming each task is an object, so storing it as an array
                state.errorMessage = '';
            });
    },
});

export default additiontask.reducer;

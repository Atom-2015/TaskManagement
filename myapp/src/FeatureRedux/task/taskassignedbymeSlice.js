import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';


const assigned_by = createAsyncThunk(
    "TasksCreatedByMe",
    // async (task_id, {rejectWithValue }) => {

    // }
    async (_, {rejectWithValue})=>{
        try {
            const response = await axiosInstance.get('/api/task/taskassignedby');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create task'
            );
        }
    }
);


// Slice for All Tasks Assignd By Me

const alltaskcreatedbyme = createSlice({
    name: 'taskscreatedbyme',
    initialState: {
        isError: false,
        isLoading: false,
        task: [],
        errorMessage: '',
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(assigned_by.pending , (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.task = [];
            state.errorMessage = '';
        })
        .addCase(assigned_by.rejected , (state, action)=>{
            state.task = [];
            state.errorMessage = action.payload || 'Failed to add task';
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(assigned_by.fulfilled , (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.task = [action.payload];  
            state.errorMessage = '';
        })
    }
})


export default alltaskcreatedbyme.reducer;
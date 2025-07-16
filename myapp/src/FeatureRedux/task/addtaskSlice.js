import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import axios from "axios";

// Async Thunk to Add Task
// data : submissionData , id:projectId
export const addtask = createAsyncThunk(
    'additionoftask',
    async ({data , id}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/task/createTask', data, {
                headers: { 
                    'x-project-id':id
                    // 'x-project-id':taskdata.ProjectName
                }
            });
            // console.log(`yo hai response to check status ${JSON.stringify(response.status)}`)
            // console.log(`yo hai response to check status ${JSON.stringify(data)}`)
            // if(response.status === 201){
            //    const aditya = await axios.post('http://localhost:3001/api/mailTask' , data);
            //    console.log(`this is aditya ${aditya}`)
            // }
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

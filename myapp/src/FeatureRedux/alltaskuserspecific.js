import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';

export const alltaskuserspecific = createAsyncThunk(
    "allusertask",
    async (_, { rejectWithValue }) => {
        try {

          
            const response = await axiosInstance.get('/api/task/taskassigned');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to Fetch Data"
            );
        }
    }
)

const alltaskuserspecificSlice = createSlice({
    name: 'alltaskuserspecific',
    initialState: {
        isError: false,
        isLoading: false,
        data: [],  // Ensure this is an empty array initially
        errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(alltaskuserspecific.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.data = [];
                state.errorMessage = "";
            })
            .addCase(alltaskuserspecific.rejected, (state, action) => {
                state.data = [];
                state.errorMessage = action.payload || "Failed to fetch users";
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(alltaskuserspecific.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.data = action.payload;
                state.errorMessage = "";
            });
    }
});

export default alltaskuserspecificSlice.reducer;

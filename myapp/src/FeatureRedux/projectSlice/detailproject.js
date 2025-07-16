import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { buildQueries } from "@testing-library/react";

export const projectdetails = createAsyncThunk(
    "projectdetails",
    async (formData, { rejectWithValue }) => {
        try {
            console.log("cehck mate")
            const response = await axiosInstance.get("/api/project/projectDetail", {
                headers: {
                    'x-project-id': formData
                }
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to show projects"
            );
        }
    }
);




const projectslice = createSlice({
    name : "getprojectDetail",
    initialState: {
        isError: false,
        isLoading: false,
        task: [],
        errorMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(projectdetails.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.task = [];
                state.errorMessage = '';
            })
            .addCase(projectdetails.rejected, (state, action) => {
                state.task = [];
                state.errorMessage = action.payload || 'Failed to add task';
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(projectdetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.task = action.payload;  // Assuming each task is an object, so storing it as an array
                state.errorMessage = '';
            });
    }
})

// export  {projectdetails}

export default projectslice.reducer;

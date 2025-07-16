import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const EditOverrIdesCreate = createAsyncThunk(
  "edit/overrides",
  async ({ overridesId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/holiday/${overridesId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit data"
      );
    }
  }
);


const editOverrideSlice = createSlice({
  name: "editOverrides",
  initialState: {
    isError: false,
    isLoading: false,
    editData: null,
    errorMessage: "",
    isSuccess: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EditOverrIdesCreate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
        state.isSuccess = false;
      })

      .addCase(EditOverrIdesCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.editData = action.payload;
      })

      .addCase(EditOverrIdesCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

export default editOverrideSlice.reducer;

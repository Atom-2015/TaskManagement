import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"

export const createFastInspaction = createAsyncThunk(
  "createFastInspaction",
  async (fastInspactionDataall, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://13.201.248.202:3001/api/main/storefastInspaction", fastInspactionDataall, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          'x-image-id' : localStorage.getItem('image-id'),
          'x-report-id' : Cookies.get('reportId')
            // 'x-image-id':imageid
        },
      });
      return response.data;
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "An unexpected error occurred");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const analyseFastInspactionSlice = createSlice({
  name: "FastInspactionCreation",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
    fastInspactionDataall: [],
  },
  reducers: {
    // Optional: If you need a manual update function
    updateFastInspactionData: (state, action) => {
      state.fastInspactionDataall = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFastInspaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createFastInspaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(createFastInspaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to create Fast Inspaction";
      });
  },
});

export const { updateFastInspactionData } = analyseFastInspactionSlice.actions;

export default analyseFastInspactionSlice.reducer;

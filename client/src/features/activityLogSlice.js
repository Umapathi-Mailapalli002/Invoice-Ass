import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Get All ActivityLogs
export const getAllActivityLogs = createAsyncThunk(
  "activityLogs/getAllActivityLogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/activities");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error retrieving recent user activities"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  activityLogs: [],
};

const activityLogsSlice = createSlice({
  name: "activityLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Recent activities of user
    builder
      .addCase(getAllActivityLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.activityLogs = action.payload;
      })
      .addCase(getAllActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default activityLogsSlice.reducer;

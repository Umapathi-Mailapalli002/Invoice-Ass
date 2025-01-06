import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
export const login = createAsyncThunk(
  "userAuth/login",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/login", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to login"
      );
    }
  }
);

export const register = createAsyncThunk(
  "userAuth/register",
  async (
    { email, username, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/register", { email, username, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to register"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "userAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to logout"
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "userAuth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/refresh-token", {}, { withCredentials: true });
      return response.data; // Contains `accessToken`
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error refreshing token"
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login Cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout Cases
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register Cases
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = {
          ...state.token,
          refreshToken: action.payload.data.refreshToken,
          accessToken: action.payload.data.accessToken,
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;

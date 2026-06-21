import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const token = localStorage.getItem("token");

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/auth/register", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Registration failed",
        },
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/auth/login", formData);

      localStorage.setItem("token", response.data.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Login failed",
        },
      );
    }
  },
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/auth/me");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || {
        message: "Failed to get user",
      },
    );
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Profile update failed",
        },
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: token || null,
    loading: false,
    success: false,
    error: null,
    message: null,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },

    clearAuthState: (state) => {
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message = action.payload.message;

        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // GET ME
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = action.payload?.data || action.payload?.user || null;
      })

      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message = action.payload.message;

        if (action.payload.data) {
          state.user = {
            ...state.user,
            ...action.payload.data,
          };
        }
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;

export default authSlice.reducer;

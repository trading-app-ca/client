import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');

      const response = await ApiManager.getUserData();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg || error.message || 'An error occurred while fetching user data');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiManager.login(data);
      localStorage.setItem('authToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg || error.message || 'An error occurred during login');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiManager.register(data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.msg || error.message || 'An error occurred during registration');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('authToken'), 
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
    },
    initializeAuth(state) {
      const token = localStorage.getItem('authToken');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('authToken', action.payload.token);
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;

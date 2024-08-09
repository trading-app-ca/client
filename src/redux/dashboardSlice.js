import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

export const fetchUserData = createAsyncThunk('dashboard/fetchUserData', async () => {
  return await ApiManager.getUserData();
});

export const fetchPortfolioData = createAsyncThunk('dashboard/fetchPortfolioData', async () => {
  return await ApiManager.getPortfolioData();
});

export const fetchTradesData = createAsyncThunk('dashboard/fetchTradesData', async () => {
  return await ApiManager.getTradesData();
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    userData: null,
    portfolioData: null,
    tradesData: null,
    marketData: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setMarketData(state, action) {
      state.marketData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.portfolioData = action.payload;
      })
      .addCase(fetchTradesData.fulfilled, (state, action) => {
        state.tradesData = action.payload;
      });
  },
});

export const { setMarketData } = dashboardSlice.actions;
export default dashboardSlice.reducer;

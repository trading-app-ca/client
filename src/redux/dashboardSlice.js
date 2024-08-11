import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk('dashboard/fetchUserData', async () => {
  console.log('Fetching user data...');
  const data = await ApiManager.getUserData();
  console.log('User data fetched:', data);
  return data;
});

// Async thunk to fetch portfolio
export const fetchPortfolioData = createAsyncThunk('dashboard/fetchPortfolioData', async () => {
  console.log('Fetching portfolio data...');
  const data = await ApiManager.getPortfolioData();
  console.log('Portfolio data fetched:', data);
  return data || { assets: [], trades: [] };
});

// Async thunk to fetch trades
export const fetchTradesData = createAsyncThunk('dashboard/fetchTradesData', async () => {
  console.log('Fetching trades data...');
  const data = await ApiManager.getTradesData();
  console.log('Trades data fetched:', data);
  return data || [];
});

// Slice definition to manage the dashboard state
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
    // Action to set market data in the state
    setMarketData(state, action) {
      console.log('Setting market data:', action.payload);
      state.marketData = action.payload;
    },
  },
  extraReducers: (builder) => {

    // Set loading status when the thunk is pending
    builder.addCase(fetchUserData.pending, (state) => {
      console.log('Fetching user data...');
      state.status = 'loading'; 
    })

    // Success status when the thunk is fulfilled
    .addCase(fetchUserData.fulfilled, (state, action) => {
      console.log('User data fetched successfully:', action.payload);
      state.userData = action.payload;  
      state.status = 'succeeded';    
    })

     // Error status thunk is rejected
    .addCase(fetchUserData.rejected, (state, action) => {
      console.error('Failed to fetch user data:', action.error.message);
      state.error = action.error.message; 
      state.status = 'failed';            
    })

    // Handle actions from fetchPortfolioData thunk
    .addCase(fetchPortfolioData.fulfilled, (state, action) => {
      console.log('Portfolio data fetched successfully:', action.payload);
      state.portfolioData = action.payload; 
    })

    // Handle actions from fetchTradesData thunk
    .addCase(fetchTradesData.fulfilled, (state, action) => {
      console.log('Trades data fetched successfully:', action.payload);
      state.tradesData = action.payload;
    });
  },
});

export const { setMarketData } = dashboardSlice.actions;
export default dashboardSlice.reducer;

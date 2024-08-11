import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';
import { fetchPortfolioData } from './portfolioSlice';  

// Async thunk to fetch trade history from the API
export const fetchTradeHistory = createAsyncThunk(
  'trade/fetchTradeHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.getTradesData();
      if (!Array.isArray(response)) {
        throw new Error('Invalid data format received');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch trade history');
    }
  }
);

// Async thunk to create a new trade and update portfolio and trade history
export const createTrade = createAsyncThunk(
  'trade/createTrade',
  async (tradeData, { dispatch, rejectWithValue }) => {
    try {
      const response = await ApiManager.createTrade(tradeData);
      
      if (!response || typeof response !== 'object') {
        throw new Error('Trade creation failed');
      }
      dispatch(fetchPortfolioData()); // Fetch portfolio data after a trade is created
      dispatch(fetchTradeHistory()); // Refresh trade history after a trade is created

      return response; 
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create trade');
    }
  }
);

// Slice to manage trade state and handle actions
const tradeSlice = createSlice({
  name: 'trade',
  initialState: {
    trades: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTradeHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trades = action.payload; 
      })
      .addCase(fetchTradeHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createTrade.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trades.push(action.payload); 
      })
      .addCase(createTrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default tradeSlice.reducer;

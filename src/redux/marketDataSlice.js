import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

// Async thunk to fetch market data
export const fetchMarketData = createAsyncThunk(
  'marketData/fetchMarketData',
  async (symbols, { rejectWithValue }) => {
    try {
      const marketDataPromises = symbols.map(symbol => ApiManager.getMarketData(symbol));
      const marketDataResponses = await Promise.all(marketDataPromises);
      
      // Structure data as an object with symbol keys
      const marketData = marketDataResponses.reduce((acc, response, index) => {
        const symbol = symbols[index].replace('USDT', '');
        acc[symbol] = parseFloat(response.price);
        return acc;
      }, {});

      return marketData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch market data');
    }
  }
);

// Market data slice
const marketDataSlice = createSlice({
  name: 'marketData',
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default marketDataSlice.reducer;

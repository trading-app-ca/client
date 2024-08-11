import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';
import { fetchMarketData } from './marketDataSlice'; 

// Async thunk to fetch portfolio data including assets, trades, and calculate values
export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const portfolioResponse = await ApiManager.getPortfolioData();
      const tradesResponse = await ApiManager.getTradesData();

      const assets = portfolioResponse?.assets || [];
      const trades = Array.isArray(tradesResponse) ? tradesResponse : [];

      if (assets.length === 0 && trades.length === 0) {
        return rejectWithValue('No portfolio history');
      }

      const assetSymbols = assets.map(asset => `${asset.asset}USDT`);
      
      // Fetch market data if not already in state
      let marketData = getState().marketData.data;
      if (!Object.keys(marketData).length) {
        marketData = await dispatch(fetchMarketData(assetSymbols)).unwrap();
      }

      const totalValue = assets.reduce((total, asset) => {
        const currentPrice = marketData[asset.asset.toUpperCase()] || 0;
        const assetValue = asset.quantity * currentPrice;
        return total + assetValue;
      }, 0);

      const profitLoss = assets.reduce((total, asset) => {
        const currentPrice = marketData[asset.asset.toUpperCase()] || 0;
        const profitLossForAsset = (currentPrice - asset.averagePurchasePrice) * asset.quantity;
        return total + profitLossForAsset;
      }, 0);

      return {
        assets,
        trades,
        portfolioValue: totalValue,
        profitLoss,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch portfolio data.');
    }
  }
);

// Slice to manage portfolio state and handle actions
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    assets: [],
    trades: [],
    portfolioValue: 0,
    profitLoss: 0,
    isLoading: false,
    error: null,
    noDataFound: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.noDataFound = false;
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assets = action.payload.assets;
        state.trades = action.payload.trades;
        state.portfolioValue = action.payload.portfolioValue;
        state.profitLoss = action.payload.profitLoss;
        state.noDataFound = false;
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.noDataFound = action.payload === 'No portfolio history';
      });
  },
});

export default portfolioSlice.reducer;

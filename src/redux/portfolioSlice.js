import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async (_, { rejectWithValue }) => {
    try {
      const portfolioResponse = await ApiManager.getPortfolioData();
      const tradesResponse = await ApiManager.getTradesData();

      const assets = portfolioResponse.assets;
      const trades = tradesResponse;

      const totalValue = assets.reduce((total, asset) => {
        const assetTrades = trades.filter(trade => trade.asset === asset.asset);
        let assetValue = asset.quantity * asset.averagePurchasePrice;

        assetTrades.forEach(trade => {
          const tradeValue = trade.quantity * trade.price;
          assetValue = trade.type === 'buy' ? assetValue + tradeValue : assetValue - tradeValue;
        });

        return total + assetValue;
      }, 0);

      return { assets, trades, portfolioValue: totalValue };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    assets: [],
    trades: [],
    portfolioValue: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assets = action.payload.assets;
        state.trades = action.payload.trades;
        state.portfolioValue = action.payload.portfolioValue;
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default portfolioSlice.reducer;

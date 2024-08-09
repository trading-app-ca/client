import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

export const fetchTradeHistory = createAsyncThunk(
  'trade/fetchTradeHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.getTradesData();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      });
  },
});

export default tradeSlice.reducer;

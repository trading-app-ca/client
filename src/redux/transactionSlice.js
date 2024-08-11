import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching transactions...');
      const response = await ApiManager.getTransactionsData();

      if (!Array.isArray(response)) {
        console.error('Invalid data format received:', response);
        throw new Error('Invalid data format received');
      }

      if (response.length === 0) {
        console.log('No transactions found');
        return rejectWithValue('No transactions found.');
      }

      console.log('Transactions fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    isLoading: false,
    error: null,
    noDataFound: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        console.log('Fetching transactions - pending');
        state.isLoading = true;
        state.error = null;
        state.noDataFound = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        console.log('Fetching transactions - fulfilled');
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        console.error('Fetching transactions - rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.noDataFound = action.payload === 'No transactions found.'; 
      });
  },
});

export default transactionSlice.reducer;

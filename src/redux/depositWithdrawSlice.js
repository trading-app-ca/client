import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../apimanager/ApiManager';

// Async thunk to fetch the user's current balance
export const fetchUserBalance = createAsyncThunk('depositWithdraw/fetchUserBalance', async () => {
  const userData = await ApiManager.getUserData();
  return userData.balance;
});

// Async thunk to handle depositing funds
export const depositFunds = createAsyncThunk('depositWithdraw/depositFunds', async (amount, { dispatch, rejectWithValue }) => {
  try {
    await ApiManager.depositFunds(amount); 
    await dispatch(fetchUserBalance()); 
    return amount;
  } catch (error) {
    console.error('Deposit error:', error);
    return rejectWithValue(error.message);
  }
});

// Async thunk to handle withdrawing funds
export const withdrawFunds = createAsyncThunk('depositWithdraw/withdrawFunds', async (amount, { dispatch, rejectWithValue }) => {
  try {
    await ApiManager.withdrawFunds(amount); 
    await dispatch(fetchUserBalance());
    return amount;
  } catch (error) {
    console.error('Withdraw error:', error);
    return rejectWithValue(error.message);
  }
});

// Redux slice to manage deposit and withdrawal state
const depositWithdrawSlice = createSlice({
  name: 'depositWithdraw',
  initialState: { balance: 0, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(depositFunds.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(withdrawFunds.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default depositWithdrawSlice.reducer;

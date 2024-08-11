import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import portfolioReducer from './portfolioSlice';  
import dashboardReducer from './dashboardSlice';
import tradeReducer from './tradeSlice';
import transactionReducer from './transactionSlice'; 
import depositWithdrawReducer from './depositWithdrawSlice';
import marketDataReducer from './marketDataSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,  
    dashboard: dashboardReducer,
    trade: tradeReducer,  
    transaction: transactionReducer,  
    depositWithdraw: depositWithdrawReducer,  
    marketData: marketDataReducer,
  },
});

export default store;

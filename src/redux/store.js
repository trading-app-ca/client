import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import portfolioReducer from './portfolioSlice';  
import dashboardReducer from './dashboardSlice';
import tradeReducer from './tradeSlice';
import transactionReducer from './transactionSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,  
    dashboard: dashboardReducer,
    trade: tradeReducer,  
    transaction: transactionReducer,  
  },
});

export default store;

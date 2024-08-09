import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import portfolioReducer from './portfolioSlice';  
import dashboardReducer from './dashboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    portfolio: portfolioReducer,  
    dashboard: dashboardReducer, 
  },
});

export default store;

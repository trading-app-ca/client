import ApiMethods from './ApiMethods';
import ENDPOINTS from './EndPoints';
import axios from 'axios';

class ApiManager {
  // Fetch user data
  static getUserData() {
    return ApiMethods.get(ENDPOINTS.GET_USER);
  }

  // Update user information
  static updateUserInfo(data) {
    return ApiMethods.put(ENDPOINTS.GET_USER, data);
  }

  // Delete user
  static deleteUser() {
    return ApiMethods.delete(ENDPOINTS.GET_USER);
  }

  // Fetch portfolio data 
  static getPortfolioData() {
    return ApiMethods.get(ENDPOINTS.GET_PORTFOLIO);
  }

  // Fetch trades data 
  static getTradesData() {
    return ApiMethods.get(ENDPOINTS.GET_TRADES);
  }

  // Fetch transactions data 
  static getTransactionsData() {
    return ApiMethods.get(ENDPOINTS.GET_TRANSACTIONS);
  }

  // Fetch market data from Binance API
  static async getMarketData(symbol) {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  // Create a new trade
  static async createTrade(tradeData) {
    try {
      const response = await ApiMethods.post(ENDPOINTS.CREATE_TRADE, tradeData);
      return response;
    } catch (error) {
      console.error('Error creating trade:', error);
      throw error;
    }
  }

  // Deposit funds into the user's account
  static depositFunds(amount) {
    return ApiMethods.post(ENDPOINTS.DEPOSIT_FUNDS, { amount });
  }

  // Withdraw funds from the user's account
  static withdrawFunds(amount) {
    return ApiMethods.post(ENDPOINTS.WITHDRAW_FUNDS, { amount });
  }

  // Verify user's password
  static verifyPassword(password) {
    return ApiMethods.post(ENDPOINTS.VERIFY_PASSWORD, { password });
  }

  // Login user
  static login(data) {
    return ApiMethods.post(ENDPOINTS.LOGIN, data);
  }

  // Register a new user
  static register(data) {
    return ApiMethods.post(ENDPOINTS.REGISTER, data);
  }
}

export default ApiManager;

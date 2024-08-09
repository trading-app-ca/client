import ApiMethods from './ApiMethods';
import ENDPOINTS from './EndPoints';
import axios from 'axios';

class ApiManager {
  static getUserData() {
    return ApiMethods.get(ENDPOINTS.GET_USER);
  }

  static getPortfolioData() {
    return ApiMethods.get(ENDPOINTS.GET_PORTFOLIO);
  }

  static getTradesData() {
    return ApiMethods.get(ENDPOINTS.GET_TRADES);
  }

  static getTransactionsData() {
    return ApiMethods.get(ENDPOINTS.GET_TRANSACTIONS);
  }
  static async getMarketData(symbol) {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }
  

  static login(data) {
    return ApiMethods.post(ENDPOINTS.LOGIN, data);
  }

  static register(data) {
    return ApiMethods.post(ENDPOINTS.REGISTER, data);
  }
}

export default ApiManager;

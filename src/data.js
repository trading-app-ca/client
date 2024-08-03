export const fakeCustomerData = {
  name: "Horatio Higglesmith",
  balance: 5000.00,
  portfolioValue: 20000.00, // Updated to match the last value in portfolioHistory.values
  portfolioHistory: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [10000, 12000, 15000, 13000, 16000, 18000, 20000] // Historical values
  },
  recentTransactions: [
    { date: '14/07/2023', type: 'Deposit', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
    { date: '12/07/2023', type: 'Withdraw', asset: 'USD', amount: 1000, price: 1.0, total: 1000 },
    { date: '10/07/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
    { date: '08/07/2023', type: 'Withdraw', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
    { date: '06/07/2023', type: 'Deposit', asset: 'USD', amount: 3000, price: 1.0, total: 3000 },
  ],
  recentTrades: [
    { date: '14/07/2023', pair: 'BTC/USD', action: 'Buy', amount: 0.1, price: 35000, total: 3500 },
    { date: '12/07/2023', pair: 'ETH/USD', action: 'Sell', amount: 1, price: 2500, total: 2500 },
    { date: '10/07/2023', pair: 'ADA/USD', action: 'Buy', amount: 1000, price: 1.20, total: 1200 },
    { date: '08/07/2023', pair: 'BNB/USD', action: 'Sell', amount: 5, price: 350, total: 1750 },
    { date: '06/07/2023', pair: 'DOGE/USD', action: 'Buy', amount: 10000, price: 0.30, total: 3000 },
  ]
};

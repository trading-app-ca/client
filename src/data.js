export const fakeCustomerData = {
  name: "Horatio Higglesmith",
  balance: 5000.00,
  portfolioValue: 20000.00,
  portfolioHistory: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [10000, 12000, 15000, 13000, 16000, 18000, 20000] // Historical values
  },
  transactions: [
    { date: '14/07/2023', type: 'Deposit', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
    { date: '12/07/2023', type: 'Withdraw', asset: 'USD', amount: 1000, price: 1.0, total: 1000 },
    { date: '10/07/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
    { date: '08/07/2023', type: 'Withdraw', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
    { date: '06/07/2023', type: 'Deposit', asset: 'USD', amount: 3000, price: 1.0, total: 3000 },
    { date: '04/07/2023', type: 'Deposit', asset: 'USD', amount: 2500, price: 1.0, total: 2500 },
    { date: '02/07/2023', type: 'Withdraw', asset: 'USD', amount: 1500, price: 1.0, total: 1500 },
    { date: '30/06/2023', type: 'Deposit', asset: 'USD', amount: 3500, price: 1.0, total: 3500 },
    { date: '28/06/2023', type: 'Withdraw', asset: 'USD', amount: 1200, price: 1.0, total: 1200 },
    { date: '26/06/2023', type: 'Deposit', asset: 'USD', amount: 3000, price: 1.0, total: 3000 },
    { date: '24/06/2023', type: 'Withdraw', asset: 'USD', amount: 2500, price: 1.0, total: 2500 },
    { date: '22/06/2023', type: 'Deposit', asset: 'USD', amount: 4000, price: 1.0, total: 4000 },
    { date: '20/06/2023', type: 'Withdraw', asset: 'USD', amount: 1800, price: 1.0, total: 1800 },
    { date: '18/06/2023', type: 'Deposit', asset: 'USD', amount: 2800, price: 1.0, total: 2800 },
    { date: '16/06/2023', type: 'Deposit', asset: 'USD', amount: 3200, price: 1.0, total: 3200 },
    { date: '14/06/2023', type: 'Withdraw', asset: 'USD', amount: 1000, price: 1.0, total: 1000 },
    { date: '12/06/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
    { date: '10/06/2023', type: 'Withdraw', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
    { date: '08/06/2023', type: 'Deposit', asset: 'USD', amount: 3000, price: 1.0, total: 3000 },
    { date: '06/06/2023', type: 'Withdraw', asset: 'USD', amount: 2000, price: 1.0, total: 2000 },
  ],
  recentTrades: [
    { date: '14/07/2023', pair: 'BTC/USD', action: 'Buy', amount: 0.1, price: 35000, total: 3500 },
    { date: '12/07/2023', pair: 'ETH/USD', action: 'Sell', amount: 1, price: 2500, total: 2500 },
    { date: '10/07/2023', pair: 'ADA/USD', action: 'Buy', amount: 1000, price: 1.20, total: 1200 },
    { date: '08/07/2023', pair: 'BNB/USD', action: 'Sell', amount: 5, price: 350, total: 1750 },
    { date: '06/07/2023', pair: 'DOGE/USD', action: 'Buy', amount: 10000, price: 0.30, total: 3000 },
    { date: '04/07/2023', pair: 'BTC/USD', action: 'Sell', amount: 0.05, price: 34000, total: 1700 },
    { date: '02/07/2023', pair: 'ETH/USD', action: 'Buy', amount: 0.5, price: 2400, total: 1200 },
    { date: '30/06/2023', pair: 'ADA/USD', action: 'Sell', amount: 500, price: 1.25, total: 625 },
    { date: '28/06/2023', pair: 'BNB/USD', action: 'Buy', amount: 2, price: 330, total: 660 },
    { date: '26/06/2023', pair: 'DOGE/USD', action: 'Sell', amount: 5000, price: 0.32, total: 1600 },
    { date: '24/06/2023', pair: 'BTC/USD', action: 'Buy', amount: 0.15, price: 35500, total: 5325 },
    { date: '22/06/2023', pair: 'ETH/USD', action: 'Sell', amount: 0.8, price: 2450, total: 1960 },
    { date: '20/06/2023', pair: 'ADA/USD', action: 'Buy', amount: 200, price: 1.30, total: 260 },
    { date: '18/06/2023', pair: 'BNB/USD', action: 'Sell', amount: 1, price: 340, total: 340 },
    { date: '16/06/2023', pair: 'DOGE/USD', action: 'Buy', amount: 3000, price: 0.31, total: 930 },
    { date: '14/06/2023', pair: 'BTC/USD', action: 'Sell', amount: 0.08, price: 34500, total: 2760 },
    { date: '12/06/2023', pair: 'ETH/USD', action: 'Buy', amount: 1.2, price: 2450, total: 2940 },
    { date: '10/06/2023', pair: 'ADA/USD', action: 'Sell', amount: 1000, price: 1.15, total: 1150 },
    { date: '08/06/2023', pair: 'BNB/USD', action: 'Buy', amount: 3, price: 335, total: 1005 },
    { date: '06/06/2023', pair: 'DOGE/USD', action: 'Sell', amount: 2000, price: 0.28, total: 560 },
  ],
  assets: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      quantityHeld: 2,
      averagePurchasePrice: 30000,
      history: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        values: [25000, 28000, 30000, 32000, 34000, 33000, 35000]
      }
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      quantityHeld: 5,
      averagePurchasePrice: 2000,
      history: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        values: [1800, 1900, 2100, 2200, 2300, 2400, 2500]
      }
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      quantityHeld: 1000,
      averagePurchasePrice: 1.2,
      history: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        values: [1.0, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35]
      }
    }
  ]
};

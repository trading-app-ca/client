import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { fakeCustomerData } from '../data';
import axios from 'axios';
import PortfolioChart from '../components/PortfolioChart';

const Dashboard = () => {
  const [customerData] = useState(fakeCustomerData);
  const [marketData, setMarketData] = useState({
    BTC: 0,
    ETH: 0,
    LTC: 0,
    BNB: 0,
    ADA: 0,
  });

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [btcResponse, ethResponse, ltcResponse, bnbResponse, adaResponse] = await Promise.all([
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT'),
          axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT'),
        ]);

        setMarketData({
          BTC: parseFloat(btcResponse.data.price).toFixed(2),
          ETH: parseFloat(ethResponse.data.price).toFixed(2),
          LTC: parseFloat(ltcResponse.data.price).toFixed(2),
          BNB: parseFloat(bnbResponse.data.price).toFixed(2),
          ADA: parseFloat(adaResponse.data.price).toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, []);

  const mappedTransactions = customerData.recentTransactions.map(tx => ({
    date: new Date(tx.date.split('/').reverse().join('-')),
    type: tx.type,
    amount: tx.amount,
    asset: tx.asset
  }));

  const mappedTrades = customerData.recentTrades.map(trade => ({
    date: new Date(trade.date.split('/').reverse().join('-')),
    type: trade.action === 'Buy' ? 'Buy' : 'Sell',
    amount: trade.total,
    asset: trade.pair
  }));

  const recentActivity = [
    ...mappedTransactions.sort((a, b) => b.date - a.date).slice(0, 2),
    ...mappedTrades.sort((a, b) => b.date - a.date).slice(0, 2)
  ];

  return (
    <div className="content-container">
      <div className="row">

        <Card title="Market Overview" className="transaction-details">
          <p>BTC: <span className="highlight">${marketData.BTC}</span></p>
          <p>ETH: <span className="highlight">${marketData.ETH}</span></p>
          <p>LTC: <span className="highlight">${marketData.LTC}</span></p>
          <p>BNB: <span className="highlight">${marketData.BNB}</span></p>
          <p>ADA: <span className="highlight">${marketData.ADA}</span></p>
        </Card>

        <Card title="Recent Activity" className="transaction-details">
          {recentActivity.map((activity, index) => (
            <div key={index}>
              <p><strong>{activity.type}:</strong> <span className="highlight">${activity.amount.toFixed(2)} <em>({activity.asset})</em></span></p>
            </div>
          ))}
        </Card>

      </div>

      <Card title="Your Portfolio">
        <PortfolioChart portfolioData={customerData.portfolioHistory} />
      </Card>
    </div>
  );
};

export default Dashboard;

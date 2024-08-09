import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/common/Card';
import axios from 'axios';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { auth } = useContext(AuthContext); 
  const [customerData, setCustomerData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [tradesData, setTradesData] = useState(null);
  const [marketData, setMarketData] = useState({
    BTC: 0,
    ETH: 0,
    LTC: 0,
    BNB: 0,
    ADA: 0,
  });

  // Fetch customer data from the API
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/user', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/portfolio', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    const fetchTradesData = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/trades', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setTradesData(response.data);
      } catch (error) {
        console.error('Error fetching trades data:', error);
      }
    };

    fetchCustomerData();
    fetchPortfolioData();
    fetchTradesData();
  }, [auth.token]);

  // Fetch market data from the API
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

  // Combine portfolio data and trades data to pass to PortfolioChart
  const combinedPortfolioData = {
    balance: customerData ? customerData.balance : 0, 
    assets: portfolioData ? portfolioData.assets : [],
    trades: tradesData || [], 
  };

  if (!customerData || !portfolioData || !tradesData) {
    return <p>Loading...</p>; // Show loading while data is being fetched
  }

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

        <RecentActivityCard />
      </div>

      <Card title="Your Portfolio">
        <PortfolioChart portfolioData={combinedPortfolioData} />
      </Card> 
    </div>
  );
};

export default Dashboard;

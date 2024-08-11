import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/common/Card';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { fetchUserData } from '../redux/dashboardSlice'; 
import { fetchPortfolioData } from '../redux/portfolioSlice'; 
import { fetchTradeHistory } from '../redux/tradeSlice'; 
import ApiManager from '../apimanager/ApiManager';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [marketData, setMarketData] = useState({}); 

  const customerData = useSelector((state) => state.dashboard.userData);
  const portfolioData = useSelector((state) => state.portfolio);
  const tradesData = useSelector((state) => state.trade.trades);
  const status = useSelector((state) => state.dashboard.status);
  const error = useSelector((state) => state.dashboard.error);

  useEffect(() => {
    // Fetch user, portfolio, and trade data on component mount
    dispatch(fetchUserData());
    dispatch(fetchPortfolioData());
    dispatch(fetchTradeHistory());

    const fetchMarketData = async () => {
      try {
        // Fetch market data for various cryptocurrencies
        const [btcResponse, ethResponse, ltcResponse, bnbResponse, adaResponse] = await Promise.all([
          ApiManager.getMarketData('BTCUSDT'),
          ApiManager.getMarketData('ETHUSDT'),
          ApiManager.getMarketData('LTCUSDT'),
          ApiManager.getMarketData('BNBUSDT'),
          ApiManager.getMarketData('ADAUSDT'),
        ]);

        setMarketData({
          BTC: parseFloat(btcResponse.price).toFixed(2),
          ETH: parseFloat(ethResponse.price).toFixed(2),
          LTC: parseFloat(ltcResponse.price).toFixed(2),
          BNB: parseFloat(bnbResponse.price).toFixed(2),
          ADA: parseFloat(adaResponse.price).toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Combine data from multiple sources to pass to the PortfolioChart component
  const combinedPortfolioData = {
    balance: customerData?.balance || 0,
    assets: portfolioData.assets || [],
    trades: tradesData || [],
  };

  return (
    <div className="content-container">
      <div className="row">
        {/* Display market overview data */}
        <Card title="Market Overview" className="transaction-details">
          <p>BTC: <span className="highlight">${marketData.BTC}</span></p>
          <p>ETH: <span className="highlight">${marketData.ETH}</span></p>
          <p>LTC: <span className="highlight">${marketData.LTC}</span></p>
          <p>BNB: <span className="highlight">${marketData.BNB}</span></p>
          <p>ADA: <span className="highlight">${marketData.ADA}</span></p>
        </Card>

        <RecentActivityCard />
      </div>

      {/* Pass portfolio data as a prop */}
      <Card title="Your Portfolio">
        <PortfolioChart portfolioData={combinedPortfolioData} />
      </Card>
    </div>
  );
};

export default Dashboard;

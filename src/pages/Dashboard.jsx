import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/common/Card';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { fetchUserData, fetchPortfolioData, fetchTradesData, setMarketData } from '../redux/dashboardSlice';
import ApiManager from '../apimanager/ApiManager';

const Dashboard = () => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.dashboard.userData);
  const portfolioData = useSelector((state) => state.dashboard.portfolioData);
  const tradesData = useSelector((state) => state.dashboard.tradesData);
  const marketData = useSelector((state) => state.dashboard.marketData);
  const status = useSelector((state) => state.dashboard.status);
  const error = useSelector((state) => state.dashboard.error);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchPortfolioData());
    dispatch(fetchTradesData());

    const fetchMarketData = async () => {
      try {
        const [btcResponse, ethResponse, ltcResponse, bnbResponse, adaResponse] = await Promise.all([
          ApiManager.getMarketData('BTCUSDT'),
          ApiManager.getMarketData('ETHUSDT'),
          ApiManager.getMarketData('LTCUSDT'),
          ApiManager.getMarketData('BNBUSDT'),
          ApiManager.getMarketData('ADAUSDT'),
        ]);

        dispatch(setMarketData({
          BTC: parseFloat(btcResponse.price).toFixed(2),
          ETH: parseFloat(ethResponse.price).toFixed(2),
          LTC: parseFloat(ltcResponse.price).toFixed(2),
          BNB: parseFloat(bnbResponse.price).toFixed(2),
          ADA: parseFloat(adaResponse.price).toFixed(2),
        }));
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

  const combinedPortfolioData = {
    balance: customerData?.balance || 0,
    assets: portfolioData?.assets || [],
    trades: tradesData || [],
  };

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

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioAllocationChart from '../components/portfolio/PortfolioAllocationChart'; 
import RecentActivityCard from '../components/RecentActivityCard'; 
import { AuthContext } from '../contexts/AuthContext';

const Portfolio = () => {
  const { auth } = useContext(AuthContext);
  const [customerData, setCustomerData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/portfolio', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setCustomerData(response.data);
      } catch (error) {
        setError('Error fetching portfolio data.');
        console.error('Error fetching portfolio data:', error);
      }
    };

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
          BTC: parseFloat(btcResponse.data.price),
          ETH: parseFloat(ethResponse.data.price),
          LTC: parseFloat(ltcResponse.data.price),
          BNB: parseFloat(bnbResponse.data.price),
          ADA: parseFloat(adaResponse.data.price),
        });
      } catch (error) {
        setError('Error fetching market data.');
        console.error('Error fetching market data:', error);
      }
    };

    fetchCustomerData();
    fetchMarketData();
  }, [auth.token]);

  const calculateAssetOverview = (asset, quantity, averagePurchasePrice) => {
    const currentPrice = marketData ? marketData[asset.toUpperCase()] || 0 : 0;
    const currentValue = currentPrice * quantity;
    const profitLoss = (currentPrice - averagePurchasePrice) * quantity;
    const profitLossPercentage = averagePurchasePrice !== 0 ? ((currentPrice - averagePurchasePrice) / averagePurchasePrice) * 100 : 0;

    return { currentPrice, currentValue, profitLoss, profitLossPercentage };
  };

  const assetsWithValues = customerData && customerData.assets ? customerData.assets.map(asset => ({
    ...asset,
    ...calculateAssetOverview(asset.asset, asset.quantity, asset.averagePurchasePrice),
  })) : [];

  return (
    <div className="content-container">
      <div className="row">
        <Card title="Your Portfolio Overview">
          {customerData && customerData.portfolioValue ? (
            <>
              <p><strong>Total Portfolio Value:</strong> <span className="highlight">${customerData.portfolioValue.toFixed(2)}</span></p>
              <p><strong>Total Profit/Loss:</strong> <span className="highlight">${(customerData.portfolioValue - (customerData.portfolioHistory ? customerData.portfolioHistory.values[0] : 0)).toFixed(2)}</span></p>
            </>
          ) : (
            <>
              <p><strong>Total Portfolio Value:</strong> <span className="highlight">$0</span></p>
              <p><strong>Total Profit/Loss:</strong> <span className="highlight">$0</span></p>
            </>
          )}
        </Card>

        <RecentActivityCard
          recentTransactions={customerData ? customerData.recentTransactions : []}
          recentTrades={customerData ? customerData.recentTrades : []}
        />
      </div>

      <Card title="Portfolio Allocation">
        {assetsWithValues.length > 0 ? (
          <PortfolioAllocationChart assets={assetsWithValues} />
        ) : (
          <p>No assets in your portfolio.</p>
        )}
      </Card>

      {assetsWithValues.length > 0 && (
        <div className="asset-cards">
          {assetsWithValues.map((asset, index) => (
            <Card title={`${asset.asset.toUpperCase()} (${asset.asset.toUpperCase()})`} key={index} className="asset-cards">
              <p>Quantity Held: <span className="highlight">{asset.quantity}</span></p>
              <p>Current Value: <span className="highlight">${asset.currentValue.toFixed(2)}</span></p>
              <p>Average Purchase Price: <span className="highlight">${asset.averagePurchasePrice.toFixed(2)} per {asset.asset.toUpperCase()}</span></p>
              <p>Current Price: <span className="highlight">${asset.currentPrice.toFixed(2)} per {asset.asset.toUpperCase()}</span></p>
              <p>Profit/Loss: <span className="highlight">${asset.profitLoss.toFixed(2)} ({asset.profitLossPercentage.toFixed(2)}%)</span></p>

              <CollapsibleSection title="Historical Performance">
                {asset.history ? (
                  <PortfolioChart portfolioData={asset.history} />
                ) : (
                  <p>No historical performance data available.</p>
                )}
              </CollapsibleSection>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioAllocationChart from '../components/portfolio/PortfolioAllocationChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { usePortfolioData } from '../components/portfolio/PortfolioValue';

const Portfolio = () => {
  const { portfolioData, isLoading, error } = usePortfolioData();
  const [marketData, setMarketData] = useState(null);

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
          BTC: parseFloat(btcResponse.data.price),
          ETH: parseFloat(ethResponse.data.price),
          LTC: parseFloat(ltcResponse.data.price),
          BNB: parseFloat(bnbResponse.data.price),
          ADA: parseFloat(adaResponse.data.price),
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, []);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!portfolioData || !marketData) {
    return <div>Loading data...</div>;
  }

  // Calculate asset overview
  const calculateAssetOverview = (assetSymbol, quantityHeld, averagePurchasePrice) => {
    const currentPrice = marketData[assetSymbol.toUpperCase()] || 0;
    const currentValue = currentPrice * quantityHeld;
    const profitLoss = (currentPrice - averagePurchasePrice) * quantityHeld;
    const profitLossPercentage = averagePurchasePrice !== 0 ? ((currentPrice - averagePurchasePrice) / averagePurchasePrice) * 100 : 0;

    return { currentPrice, currentValue, profitLoss, profitLossPercentage };
  };

  const assetsWithValues = portfolioData.assets.map(asset => ({
    ...asset,
    ...calculateAssetOverview(asset.asset, asset.quantity, asset.averagePurchasePrice),
    name: asset.asset.toUpperCase(),
    symbol: asset.asset.toUpperCase(),
    quantityHeld: asset.quantity,
  }));

  return (
    <div className="content-container">
      <div className="row">
        <Card title="Your Portfolio Overview">
          <p><strong>Total Portfolio Value:</strong> <span className="highlight">${portfolioData.portfolioValue.toFixed(2)}</span></p>
          <p><strong>Total Profit/Loss:</strong> <span className="highlight">${(portfolioData.portfolioValue - portfolioData.assets.reduce((acc, asset) => acc + asset.averagePurchasePrice * asset.quantity, 0)).toFixed(2)}</span></p>
        </Card>

        <RecentActivityCard portfolioData={portfolioData} />
      </div>

      <Card title="Portfolio Allocation">
        <PortfolioAllocationChart assets={assetsWithValues} />
      </Card>

      <div className="asset-cards">
        {assetsWithValues.map((asset, index) => (
          <Card title={`${asset.name} (${asset.symbol})`} key={index} className="asset-cards">
            <p>Quantity Held: <span className="highlight">{asset.quantityHeld}</span></p>
            <p>Current Value: <span className="highlight">${asset.currentValue.toFixed(2)}</span></p>
            <p>Average Purchase Price: <span className="highlight">${asset.averagePurchasePrice.toFixed(2)} per {asset.symbol}</span></p>
            <p>Current Price: <span className="highlight">${asset.currentPrice.toFixed(2)} per {asset.symbol}</span></p>
            <p>Profit/Loss: <span className="highlight">${asset.profitLoss.toFixed(2)} ({asset.profitLossPercentage.toFixed(2)}%)</span></p>

            <CollapsibleSection title="Historical Performance">
              <PortfolioChart portfolioData={portfolioData} />
            </CollapsibleSection>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

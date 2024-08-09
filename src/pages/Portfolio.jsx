import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioAllocationChart from '../components/portfolio/PortfolioAllocationChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { fetchPortfolioData } from '../redux/portfolioSlice';
import ApiManager from '../apimanager/ApiManager';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { assets, trades, portfolioValue, isLoading, error } = useSelector((state) => state.portfolio);
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    dispatch(fetchPortfolioData());

    const fetchMarketData = async () => {
      try {
        const [btcResponse, ethResponse, ltcResponse, bnbResponse, adaResponse] = await Promise.all([
          ApiManager.getMarketData('BTCUSDT'),
          ApiManager.getMarketData('ETHUSDT'),
          ApiManager.getMarketData('LTCUSDT'),
          ApiManager.getMarketData('BNBUSDT'),
          ApiManager.getMarketData('ADAUSDT'),
        ]);

        setMarketData({
          BTC: parseFloat(btcResponse.price),
          ETH: parseFloat(ethResponse.price),
          LTC: parseFloat(ltcResponse.price),
          BNB: parseFloat(bnbResponse.price),
          ADA: parseFloat(adaResponse.price),
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!assets.length || !marketData) {
    return <div>Loading data...</div>;
  }
  const calculateAssetOverview = (assetSymbol, quantityHeld, averagePurchasePrice) => {
    const currentPrice = marketData[assetSymbol.toUpperCase()] || 0;
    const currentValue = currentPrice * quantityHeld;
    const profitLoss = (currentPrice - averagePurchasePrice) * quantityHeld;
    const profitLossPercentage = averagePurchasePrice !== 0 ? ((currentPrice - averagePurchasePrice) / averagePurchasePrice) * 100 : 0;

    return { currentPrice, currentValue, profitLoss, profitLossPercentage };
  };

  const assetsWithValues = assets.map(asset => ({
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
          <p><strong>Total Portfolio Value:</strong> <span className="highlight">${portfolioValue.toFixed(2)}</span></p>
          <p><strong>Total Profit/Loss:</strong> <span className="highlight">${(portfolioValue - assets.reduce((acc, asset) => acc + asset.averagePurchasePrice * asset.quantity, 0)).toFixed(2)}</span></p>
        </Card>

        <RecentActivityCard portfolioData={{ assets, trades }} />
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
              <PortfolioChart portfolioData={{ assets, trades }} />
            </CollapsibleSection>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

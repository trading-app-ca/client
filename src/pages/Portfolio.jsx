import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioAllocationChart from '../components/portfolio/PortfolioAllocationChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { fetchPortfolioData } from '../redux/portfolioSlice';
import { fetchMarketData } from '../redux/marketDataSlice';

const Portfolio = () => {
  const dispatch = useDispatch();

  // Extract portfolio data and market data from the Redux store
  const { assets, trades, portfolioValue, profitLoss, isLoading, error } = useSelector((state) => state.portfolio);
  const marketData = useSelector((state) => state.marketData.data);

  // Fetch portfolio data on component mount
  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  // Fetch market data for assets when assets data is available
  useEffect(() => {
    if (assets.length > 0) {
      const assetSymbols = assets.map(asset => `${asset.asset}USDT`);
      dispatch(fetchMarketData(assetSymbols));
    }
  }, [assets, dispatch]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate asset values and performance metrics
  const assetsWithValues = assets.map(asset => ({
    ...asset,
    currentPrice: marketData[asset.asset.toUpperCase()] || 0,
    currentValue: (marketData[asset.asset.toUpperCase()] || 0) * asset.quantity,
    profitLoss: ((marketData[asset.asset.toUpperCase()] || 0) - asset.averagePurchasePrice) * asset.quantity,
    profitLossPercentage: asset.averagePurchasePrice !== 0 
      ? (((marketData[asset.asset.toUpperCase()] || 0) - asset.averagePurchasePrice) / asset.averagePurchasePrice) * 100 
      : 0,
    name: asset.asset.toUpperCase(),
    symbol: asset.asset.toUpperCase(),
    quantityHeld: asset.quantity,
  }));

  return (
    <div className="content-container">
      <div className="row">
        <Card title="Your Portfolio Overview">
          <p><strong>Total Portfolio Value:</strong> <span className="highlight">${portfolioValue.toFixed(2)}</span></p>
          <p><strong>Total Profit/Loss:</strong> <span className="highlight">${profitLoss.toFixed(2)}</span></p>
        </Card>

        <RecentActivityCard portfolioData={{ assets, trades }} />
      </div>

      <Card title="Portfolio Allocation">
        <PortfolioAllocationChart assets={assetsWithValues} />
      </Card>

      <div className="asset-cards">
        {assetsWithValues.length > 0 ? (
          assetsWithValues.map((asset, index) => (
            <Card title={`${asset.name} (${asset.symbol})`} key={index} className="asset-cards">
              <p>Quantity Held: <span className="highlight">{asset.quantityHeld}</span></p>
              <p>Current Value: <span className="highlight">${asset.currentValue?.toFixed(2) || '0.00'}</span></p>
              <p>Average Purchase Price: <span className="highlight">${asset.averagePurchasePrice?.toFixed(2) || '0.00'} per {asset.symbol}</span></p>
              <p>Current Price: <span className="highlight">${asset.currentPrice?.toFixed(2) || '0.00'} per {asset.symbol}</span></p>
              <p>Profit/Loss: <span className="highlight">${asset.profitLoss?.toFixed(2) || '0.00'} ({asset.profitLossPercentage?.toFixed(2) || '0.00'}%)</span></p>

              <CollapsibleSection title="Historical Performance">
                <PortfolioChart portfolioData={{ assets, trades }} />
              </CollapsibleSection>
            </Card>
          ))
        ) : (
          <Card>
            <p>No assets to display.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Portfolio;

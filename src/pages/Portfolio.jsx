import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';
import PortfolioChart from '../components/portfolio/PortfolioChart';
import PortfolioAllocationChart from '../components/portfolio/PortfolioAllocationChart';
import RecentActivityCard from '../components/RecentActivityCard';
import { fetchPortfolioData } from '../redux/portfolioSlice';
import { usePortfolioData } from '../components/portfolio/PortfolioValue';
import ApiManager from '../apimanager/ApiManager';

const Portfolio = () => {
  const dispatch = useDispatch();
  const { assets, trades, isLoading, error } = useSelector((state) => state.portfolio);
  const [marketData, setMarketData] = useState({});
  
  const { portfolioData, isLoading: portfolioLoading, error: portfolioError } = usePortfolioData();

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    if (assets.length > 0) {
      const fetchMarketData = async () => {
        try {
          const assetSymbols = assets.map(asset => `${asset.asset}USDT`);
          const marketDataPromises = assetSymbols.map(symbol => ApiManager.getMarketData(symbol));
          
          const marketDataResponses = await Promise.all(marketDataPromises);
          const fetchedMarketData = marketDataResponses.reduce((acc, response, index) => {
            const symbol = assetSymbols[index].replace('USDT', '');
            acc[symbol] = parseFloat(response.price);
            return acc;
          }, {});

          setMarketData(fetchedMarketData);
        } catch (error) {
          console.error('Error fetching market data:', error);
        }
      };

      fetchMarketData();
    }
  }, [assets]);

  if (isLoading || portfolioLoading) {
    return <div>Loading data...</div>;
  }

  if (error || portfolioError) {
    return <div>{error || portfolioError}</div>;
  }

  if (!assets.length || !marketData) {
    return <div>Loading data...</div>;
  }

  const assetsWithValues = portfolioData.assets.map(asset => ({
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

  const totalPortfolioValue = assetsWithValues.reduce((acc, asset) => acc + asset.currentValue, 0);
  const totalProfitLoss = totalPortfolioValue - assets.reduce((acc, asset) => acc + asset.averagePurchasePrice * asset.quantity, 0);

  return (
    <div className="content-container">
      <div className="row">
        <Card title="Your Portfolio Overview">
          <p><strong>Total Portfolio Value:</strong> <span className="highlight">${totalPortfolioValue.toFixed(2)}</span></p>
          <p><strong>Total Profit/Loss:</strong> <span className="highlight">${totalProfitLoss.toFixed(2)}</span></p>
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

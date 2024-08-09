import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiManager from '../../apimanager/ApiManager';

export const usePortfolioData = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [portfolioData, setPortfolioData] = useState({ assets: [], trades: [], portfolioValue: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (isAuthenticated && token) {
        try {
          const portfolioResponse = await ApiManager.getPortfolioData();
          const tradesResponse = await ApiManager.getTradesData();

          const assets = portfolioResponse.assets;
          const trades = tradesResponse;

          const totalValue = assets.reduce((total, asset) => {
            const assetTrades = trades.filter(trade => trade.asset === asset.asset);
            let assetValue = asset.quantity * asset.averagePurchasePrice;

            assetTrades.forEach(trade => {
              const tradeValue = trade.quantity * trade.price;
              assetValue = trade.type === 'buy' ? assetValue + tradeValue : assetValue - tradeValue;
            });

            return total + assetValue;
          }, 0);

          setPortfolioData({ assets, trades, portfolioValue: totalValue });
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching portfolio or trades data:', error);
          setError('Failed to fetch portfolio data.');
          setIsLoading(false);
        }
      }
    };

    fetchPortfolioData();
  }, [isAuthenticated, token]);

  return { portfolioData, isLoading, error };
};

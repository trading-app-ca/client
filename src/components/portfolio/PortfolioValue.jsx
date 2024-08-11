import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiManager from '../../apimanager/ApiManager';

// Custom hook to fetch portfolio data
export const usePortfolioData = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [portfolioData, setPortfolioData] = useState({ assets: [], trades: [], portfolioValue: 0, profitLoss: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio and trades data on component mount or auth state change
  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (isAuthenticated && token) {
        try {
          const portfolioResponse = await ApiManager.getPortfolioData();
          const tradesResponse = await ApiManager.getTradesData();

          const assets = portfolioResponse.assets;
          const trades = tradesResponse;

          let totalValue = 0;
          let totalProfitLoss = 0;

          assets.forEach(asset => {
            const currentMarketPrice = asset.currentMarketPrice || asset.averagePurchasePrice;
            const assetValue = asset.quantity * currentMarketPrice;
            const assetProfitLoss = (currentMarketPrice - asset.averagePurchasePrice) * asset.quantity;
            totalValue += assetValue;
            totalProfitLoss += assetProfitLoss;
          });

          setPortfolioData({ assets, trades, portfolioValue: totalValue, profitLoss: totalProfitLoss });
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

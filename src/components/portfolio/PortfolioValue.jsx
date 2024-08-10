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

          // Corrected calculation: Portfolio value should be based solely on current assets
          const totalValue = assets.reduce((total, asset) => {
            const currentMarketPrice = asset.currentMarketPrice || asset.averagePurchasePrice; // Use current market price or fallback to average purchase price
            return total + (asset.quantity * currentMarketPrice);
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

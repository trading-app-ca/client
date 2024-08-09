import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

export const usePortfolioData = () => {
  const { auth } = useContext(AuthContext);
  const [portfolioData, setPortfolioData] = useState({ assets: [], trades: [], portfolioValue: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (auth.isAuthenticated) {
        try {
          const portfolioResponse = await axios.get('https://crypto-trader-server.onrender.com/api/portfolio', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          const tradesResponse = await axios.get('https://crypto-trader-server.onrender.com/api/trades', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });

          const assets = portfolioResponse.data.assets;
          const trades = tradesResponse.data;

          // Calculate total portfolio value based on current assets and trades
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
  }, [auth.isAuthenticated, auth.token]);

  return { portfolioData, isLoading, error };
};

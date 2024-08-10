import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { usePortfolioData } from './PortfolioValue'; 

// Function to calculate portfolio value over time
const calculatePortfolioValue = (trades) => {
  const values = [];
  const assetHoldings = {};

  trades.forEach(trade => {
    const { type, quantity, price, date, asset } = trade;

    if (!assetHoldings[asset]) {
      assetHoldings[asset] = { quantity: 0, averagePurchasePrice: 0 };
    }

    const holding = assetHoldings[asset];
    const totalCost = holding.quantity * holding.averagePurchasePrice;

    if (type === 'buy') {
      holding.quantity += quantity;
      holding.averagePurchasePrice = (totalCost + (quantity * price)) / holding.quantity;
    } else if (type === 'sell') {
      holding.quantity -= quantity;
    }

    const currentPortfolioValue = Object.values(assetHoldings).reduce((acc, holding) => {
      return acc + (holding.quantity * holding.averagePurchasePrice);
    }, 0);

    values.push({ date: new Date(date), value: currentPortfolioValue });
  });

  return values;
};

const PortfolioChart = () => {
  const chartRef = useRef(null);
  const { portfolioData, isLoading, error } = usePortfolioData();

  useEffect(() => {
    if (isLoading || error) return;

    const { trades } = portfolioData;
    const portfolioValuesOverTime = calculatePortfolioValue(trades);

    if (portfolioValuesOverTime.length === 0) {
      console.warn('No portfolio values to display.');
      return;
    }

    const labels = portfolioValuesOverTime.map(point => point.date.toISOString().split('T')[0]);
    const values = portfolioValuesOverTime.map(point => point.value);

    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Portfolio Value',
            data: values,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return `$${value.toLocaleString()}`;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        maintainAspectRatio: false,
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [portfolioData, isLoading, error]);

  if (isLoading) return <p>Loading portfolio chart...</p>;
  if (error) return <p>{error}</p>;
  if (!portfolioData.trades || portfolioData.trades.length === 0) {
    return <p>No portfolio data to display.</p>;
  }

  return <canvas ref={chartRef} height="300"></canvas>;
};

export default PortfolioChart;

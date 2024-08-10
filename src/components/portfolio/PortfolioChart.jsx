import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { usePortfolioData } from './PortfolioValue'; 
const calculatePortfolioValue = (initialBalance, trades) => {
  const values = [];
  let currentBalance = initialBalance;

  trades.forEach(trade => {
    const { type, quantity, price, date } = trade;
    const tradeValue = quantity * price;

    if (type === 'buy') {
      currentBalance -= tradeValue;
    } else if (type === 'sell') {
      currentBalance += tradeValue;
    }

    values.push({ date: new Date(date), value: currentBalance });
  });

  return values;
};

const PortfolioChart = () => {
  const chartRef = useRef(null);
  const { portfolioData, isLoading, error } = usePortfolioData();

  useEffect(() => {
    if (isLoading || error) return;

    const { portfolioValue, trades } = portfolioData;
    const portfolioValuesOverTime = calculatePortfolioValue(portfolioValue, trades);

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
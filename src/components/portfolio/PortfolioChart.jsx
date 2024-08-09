import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Calculate portfolio value over time based on trades
const calculatePortfolioValue = (initialBalance, trades) => {
  if (!initialBalance || !trades || trades.length === 0) {
    console.error('Missing or empty initialBalance or trades:', { initialBalance, trades });
    return [];
  }

  const values = [];
  let currentBalance = initialBalance;

  trades.forEach(trade => {
    const { type, quantity, price, date } = trade;
    const tradeValue = quantity * price;

    // Adjust balance based on trade type
    if (type === 'buy') {
      currentBalance -= tradeValue;
    } else if (type === 'sell') {
      currentBalance += tradeValue;
    }

    // Record the value at each point in time
    values.push({ date: new Date(date), value: currentBalance });
  });

  return values;
};

const PortfolioChart = ({ portfolioData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log('Portfolio Data Received:', portfolioData);

    if (!portfolioData || !portfolioData.assets || !portfolioData.trades) {
      console.error('Incomplete portfolio data:', portfolioData);
      return;
    }

    const initialBalance = portfolioData.balance || 0;

    // Calculate portfolio values over time
    const portfolioValuesOverTime = calculatePortfolioValue(initialBalance, portfolioData.trades);

    if (portfolioValuesOverTime.length === 0) {
      console.warn('No portfolio values to display.');
      return;
    }

    const labels = portfolioValuesOverTime.map(point => point.date.toISOString().split('T')[0]);
    const values = portfolioValuesOverTime.map(point => point.value);

    console.log('Chart Labels:', labels);
    console.log('Chart Values:', values);

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
  }, [portfolioData]);

  // Error handling: display a message if necessary data is missing
  if (!portfolioData || !portfolioData.assets || !portfolioData.trades || portfolioData.trades.length === 0) {
    return <p>No portfolio data to display.</p>;
  }

  return <canvas ref={chartRef} height="300"></canvas>;
};

export default PortfolioChart;

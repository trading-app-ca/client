import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PortfolioChart = ({ portfolioData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!portfolioData || !portfolioData.labels || !portfolioData.values) return;

    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: portfolioData.labels, 
        datasets: [
          {
            label: 'Portfolio Value',
            data: portfolioData.values, 
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
                return `$${value}`;
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

  if (!portfolioData || !portfolioData.labels || !portfolioData.values || portfolioData.values.length === 0) {
    return <p>No portfolio history available.</p>;
  }

  return <canvas ref={chartRef} height="300"></canvas>;
};

export default PortfolioChart;

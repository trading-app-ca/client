import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PortfolioAllocationChart = ({ assets }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // If there are no assets, don't render the chart
    if (!assets || assets.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Create a new Chart instance
    const chartInstance = new Chart(ctx, {
      type: 'pie', 
      data: {
        labels: assets.map(asset => asset.name), // Use asset names as labels
        datasets: [
          {
            // Calculate the data points as the product of quantityHeld and currentPrice for each asset
            data: assets.map(asset => asset.quantityHeld * asset.currentPrice),
            // Define colors for each slice of the pie chart
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#C9CBCF'
            ],
            // Define colors when slices are hovered over
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
              '#C9CBCF'
            ],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true, 
        plugins: {
          legend: {
            display: true,
            position: 'top', 
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [assets]);

  return (
    <div className="portfolio-allocation-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PortfolioAllocationChart;

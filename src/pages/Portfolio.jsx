import React from 'react';
import Card from '../components/common/Card';

const Portfolio = () => {
  return (
    <div className="grid-container">
      <Card title="Your Portfolio">
        <p>Details about your portfolio.</p>
      </Card>
      <Card title="Asset Allocation">
        <p>Breakdown of your asset allocation.</p>
      </Card>
    </div>
  );
};

export default Portfolio;

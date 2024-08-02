import React from 'react';
import Card from '../components/common/Card';

const Trade = () => {
  return (
    <div className="content-container">
      <Card title="Trade">
        <h1>Trading Chart</h1>
        <div className="placeholder-image"></div>
      </Card>
      <div className="row">
        <Card title="Place your order">
          <p>Latest market trends and data.</p>
        </Card>
        <Card title="Order history">
          <p>Latest market trends and data.</p>
        </Card>
      </div>
    </div>
  );
};

export default Trade;

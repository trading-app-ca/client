import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { fakeCustomerData } from '../data';
import RecentTrades from '../components/RecentTrades';

const Trade = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    setTrades(fakeCustomerData.recentTrades);
  }, []);

  return (
    <div className="content-container">
      <Card title="Trade">
        <h1>Trading Chart</h1>
        <div className="placeholder-image"></div>
      </Card>
      <div className="row">
        <Card title="Place your order">
          <p>Buy or Sell</p>
        </Card>
        <Card title="Recent Trades">
          {trades.map((trade, index) => (
            <RecentTrades key={index} trade={trade} />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Trade;

import React from 'react';
import Card from './common/Card'; 
const RecentTrades = ({ trade }) => {
  return (
    <Card>
      <div className="transaction-details">
        <p><strong>Date:</strong> {trade.date}</p>
        <p><strong>Pair:</strong> {trade.pair}</p>
        <p><strong>Action:</strong> {trade.action}</p>
        <p><strong>Amount:</strong> {trade.amount}</p>
        <p><strong>Total:</strong> ${trade.total.toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default RecentTrades;

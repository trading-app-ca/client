import React from 'react';
import Card from './common/Card'; 

const TransactionDetails = ({ transaction }) => {
  return (
    <Card>
      <div className="transaction-details">
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Asset:</strong> {transaction.asset}</p>
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Price:</strong> ${transaction.price.toFixed(2)}</p>
        <p><strong>Total:</strong> ${transaction.total.toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default TransactionDetails;

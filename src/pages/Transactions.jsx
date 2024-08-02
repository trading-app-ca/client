import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import '../styles/pages/Transactions.scss';

export const transactionsData = [
  { date: '10/06/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
  { date: '10/06/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
  { date: '10/06/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
  { date: '10/06/2023', type: 'Deposit', asset: 'USD', amount: 5000, price: 1.0, total: 5000 },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTransactions(transactionsData);
  }, []);

  return (
    <div className="content-container">
      <h2>Transactions</h2>
      <div className="row">
        {transactions.map((transaction, index) => (
          <Card key={index}>
            <div className="transaction-details">
              <p><strong>Date:</strong> {transaction.date}</p>
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Asset:</strong> {transaction.asset}</p>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Price:</strong> ${transaction.price.toFixed(2)}</p>
              <p><strong>Total:</strong> ${transaction.total.toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transactions;

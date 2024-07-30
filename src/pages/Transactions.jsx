import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';

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
    <div className="grid-container">
      <Card title="Transactions">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Asset</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.asset}</td>
                <td>{transaction.amount}</td>
                <td>${transaction.price.toFixed(2)}</td>
                <td>${transaction.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Transactions;

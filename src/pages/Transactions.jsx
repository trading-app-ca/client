import React, { useState, useEffect } from 'react';
import { fakeCustomerData } from '../data';
import '../styles/pages/Transactions.scss';
import TransactionDetails from '../components/TransactionDetails';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(fakeCustomerData.recentTransactions);
  }, []);

  return (
    <div className="content-container">
      <h2 id="transactions-title">Transactions</h2>
      <div className="row">
        {transactions.map((transaction, index) => (
          <TransactionDetails key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;

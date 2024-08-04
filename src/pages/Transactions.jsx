import React, { useState, useEffect } from 'react';
import { fakeCustomerData } from '../data';
import TransactionsHistory from '../components/TransactionHistory';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    setTransactions(fakeCustomerData.recentTransactions);
  }, []);

  return (
    <div className="content-container">
      <TransactionsHistory 
        transactions={transactions} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

export default Transactions;

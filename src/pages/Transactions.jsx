import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionHistory from '../components/TransactionHistory';
import { fetchTransactions } from '../redux/transactionSlice';

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading, error } = useSelector((state) => state.transaction); // Select data from Redux store

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of transactions per page

  // Fetch transactions
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-container">
      {/* Render transaction history with pagination */}
      <TransactionHistory
        transactions={transactions}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Transactions;

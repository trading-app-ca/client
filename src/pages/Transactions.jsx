import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TransactionHistory from '../components/TransactionHistory';
import { AuthContext } from '../contexts/AuthContext'; 

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10; 
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/transactions', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        setError('Error fetching transaction data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [auth.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-container">
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

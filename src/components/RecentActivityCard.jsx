import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Card from './common/Card';
import { AuthContext } from '../contexts/AuthContext';

const RecentActivityCard = () => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const transactionsResponse = await axios.get('https://crypto-trader-server.onrender.com/api/transactions', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const tradesResponse = await axios.get('https://crypto-trader-server.onrender.com/api/trades', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        setTransactions(transactionsResponse.data);
        setTrades(tradesResponse.data);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        setError('Failed to load recent activity.');
      }
    };

    fetchActivityData();
  }, [auth.token]);

  // Map transactions to the desired format
  const mappedTransactions = transactions.map(tx => ({
    date: new Date(tx.date),
    type: tx.type,
    amount: tx.amount,
    asset: null
  }));

  const mappedTrades = trades.map(trade => ({
    date: new Date(trade.date),
    type: trade.type === 'buy' ? 'Buy' : 'Sell',
    amount: trade.quantity * trade.price,
    asset: trade.asset
  }));

  // Combine and sort by date, take the top 4 recent activities
  const recentActivity = [
    ...mappedTransactions,
    ...mappedTrades
  ].sort((a, b) => b.date - a.date).slice(0, 4);

  return (
    <Card title="Recent Activity" className="transaction-details">
      {error ? (
        <p>{error}</p>
      ) : recentActivity.length > 0 ? (
        recentActivity.map((activity, index) => (
          <div key={index}>
            <p>
              <strong>{activity.type}:</strong> 
              <span className="highlight">
                ${activity.amount.toFixed(2)} 
                {activity.asset && <em> ({activity.asset})</em>}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p>No recent activity.</p>
      )}
    </Card>
  );
};

export default RecentActivityCard;

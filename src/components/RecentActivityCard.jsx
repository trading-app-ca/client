import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiManager from '../apimanager/ApiManager';
import Card from './common/Card';

const RecentActivityCard = () => {
  const [transactions, setTransactions] = useState([]);
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const transactionsResponse = await ApiManager.getTransactionsData();
        const tradesResponse = await ApiManager.getTradesData();

        if (Array.isArray(transactionsResponse)) {
          setTransactions(transactionsResponse);
        } else {
          setTransactions([]);
          console.error('Transactions response is not an array:', transactionsResponse);
        }

        if (Array.isArray(tradesResponse)) {
          setTrades(tradesResponse);
        } else if (tradesResponse?.msg === 'No trades found') {
          setTrades([]);
        } else {
          setTrades([]);
          console.error('Trades response is not an array:', tradesResponse);
        }
      } catch (error) {
        console.error('Error fetching recent activity:', error);
        setError('Failed to load recent activity.');
      }
    };

    fetchActivityData();
  }, [token]);

  const mappedTransactions = Array.isArray(transactions) ? transactions.map(tx => ({
    date: new Date(tx.date),
    type: tx.type,
    amount: tx.amount,
    asset: null
  })) : [];

  const mappedTrades = Array.isArray(trades) ? trades.map(trade => ({
    date: new Date(trade.date),
    type: trade.type === 'buy' ? 'Buy' : 'Sell',
    amount: trade.quantity * trade.price,
    asset: trade.asset
  })) : [];

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

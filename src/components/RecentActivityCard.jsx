import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../redux/transactionSlice';
import { fetchTradeHistory } from '../redux/tradeSlice';
import Card from './common/Card';

// Component to display recent transactions and trades
const RecentActivityCard = () => {
  const dispatch = useDispatch();
  const { transactions, isLoading: isLoadingTransactions, error: transactionsError } = useSelector((state) => state.transaction);
  const { trades, isLoading: isLoadingTrades, error: tradesError } = useSelector((state) => state.trade);

  // Fetch transactions and trades on component mount
  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTradeHistory());
  }, [dispatch]);

  const mappedTransactions = transactions.map(tx => ({
    date: new Date(tx.date),
    type: tx.type,
    amount: tx.amount,
    asset: null,
  }));

  const mappedTrades = trades.map(trade => ({
    date: new Date(trade.date),
    type: trade.type === 'buy' ? 'Buy' : 'Sell',
    amount: trade.quantity * trade.price,
    asset: trade.asset,
  }));

  const recentActivity = [
    ...mappedTransactions,
    ...mappedTrades,
  ].sort((a, b) => b.date - a.date).slice(0, 4);

  const isLoading = isLoadingTransactions || isLoadingTrades;
  const error = transactionsError || tradesError;

  return (
    <Card title="Recent Activity" className="transaction-details">
      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : recentActivity.length > 0 ? (
        recentActivity.map((activity, index) => (
          <div key={index}>
            <p>
              <strong>{activity.type}:</strong> 
              <span className="highlight"> ${activity.amount.toFixed(2)} 
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

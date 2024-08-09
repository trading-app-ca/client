import React from 'react';
import Card from './common/Card';

const RecentActivityCard = ({ portfolioData }) => {
  // Check if portfolioData is defined and has transactions and trades arrays
  const transactions = portfolioData?.transactions || [];
  const trades = portfolioData?.trades || [];

  // Map transactions to the desired format
  const mappedTransactions = transactions.map(tx => ({
    date: new Date(tx.date),
    type: tx.type,
    amount: tx.amount,
    asset: null // Transactions don't have an associated asset
  }));

  // Map trades to the desired format
  const mappedTrades = trades.map(trade => ({
    date: new Date(trade.date),
    type: trade.type === 'buy' ? 'Buy' : 'Sell',
    amount: trade.quantity * trade.price, // Calculate the total value of the trade
    asset: trade.asset
  }));

  // Combine and sort by date, take the top 4 recent activities
  const recentActivity = [
    ...mappedTransactions,
    ...mappedTrades
  ].sort((a, b) => b.date - a.date).slice(0, 4);

  return (
    <Card title="Recent Activity" className="transaction-details">
      {recentActivity.length > 0 ? (
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

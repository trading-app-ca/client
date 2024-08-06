import React from 'react';
import Card from './common/Card';

const RecentActivityCard = ({ recentTransactions = [], recentTrades = [] }) => {
  const mappedTransactions = recentTransactions.map(tx => ({
    date: new Date(tx.date.split('/').reverse().join('-')),
    type: tx.type,
    amount: tx.amount,
    asset: tx.asset
  }));

  const mappedTrades = recentTrades.map(trade => ({
    date: new Date(trade.date.split('/').reverse().join('-')),
    type: trade.action === 'Buy' ? 'Buy' : 'Sell',
    amount: trade.total,
    asset: trade.pair
  }));

  const recentActivity = [
    ...mappedTransactions,
    ...mappedTrades
  ].sort((a, b) => b.date - a.date).slice(0, 4);

  return (
    <Card title="Recent Activity" className="transaction-details">
      {recentActivity.length > 0 ? (
        recentActivity.map((activity, index) => (
          <div key={index}>
            <p><strong>{activity.type}:</strong> <span className="highlight">${activity.amount.toFixed(2)} <em>({activity.asset})</em></span></p>
          </div>
        ))
      ) : (
        <p>No current history.</p>
      )}
    </Card>
  );
};

export default RecentActivityCard;

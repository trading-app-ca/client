import React from 'react';
import Card from '../components/common/Card';

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Card title="Dashboard Overview">
        <p>Welcome to your dashboard!</p>
      </Card>
      <Card title="Recent Activity">
        <p>Here's a summary of your recent activities.</p>
      </Card>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import Card from '../components/common/Card';

const Dashboard = () => {
  return (
    <div className="content-container">
      <div className="row">
        <Card title="Dashboard Overview" className="short-card">
          <p>Welcome to your dashboard!</p>
        </Card>
        <Card title="Recent Activity">
          <p>Here's a summary of your recent activities.</p>
        </Card>
      </div>
      <Card title="Portfolio Overview">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem eveniet facere quasi a obcaecati iste cum nihil harum recusandae numquam necessitatibus, odio, eos velit at maxime. Quibusdam, obcaecati ab. Similique ab deleniti error voluptatum, cumque velit amet saepe asperiores, assumenda accusamus neque sequi illum culpa recusandae exercitationem! Exercitationem, explicabo! Sapiente.</p>
      </Card>
    </div>
  );
};

export default Dashboard;

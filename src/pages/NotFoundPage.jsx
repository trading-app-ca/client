import React from 'react';
import Card from '../components/common/Card'; 
import '../styles/pages/NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <Card title="404 - Page Not Found">
      <p>The page you are looking for does not exist.</p>
      <p>Redirecting...</p>
    </Card>
  );
};

export default NotFoundPage;

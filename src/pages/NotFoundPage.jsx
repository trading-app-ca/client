import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>This is not the page you're looking for.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card'; 
import '../styles/pages/NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Clear timeout if the component is unmounted before redirection
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="not-found">
      <Card title="404 - Page Not Found">
        <p>The page you are looking for does not exist.</p>
        <p>Redirecting to the home page...</p>
      </Card>
    </div>
  );
};

export default NotFoundPage;

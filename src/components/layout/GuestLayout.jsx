import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Footer from './Footer';
import { AuthContext } from '../../contexts/AuthContext';

const GuestLayout = () => {
  const { auth } = useContext(AuthContext);

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="guest-layout">
      <div className="page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default GuestLayout;

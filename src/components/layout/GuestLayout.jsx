import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Footer';

const GuestLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
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

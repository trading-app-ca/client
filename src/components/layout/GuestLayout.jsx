import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const GuestLayout = () => {
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

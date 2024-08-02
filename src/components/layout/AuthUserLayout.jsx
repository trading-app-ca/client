import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header'; // Assuming you have a Header component

const AuthUserLayout = () => {
  return (
    <div className="auth-user-layout">
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthUserLayout;

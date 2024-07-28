import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AuthUserLayout = () => {
  return (
    <div className="auth-user-layout">
      <Sidebar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthUserLayout;

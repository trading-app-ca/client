import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Layout for the login and register pages
const LoginSignupLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-signup-layout">
      <Outlet />
    </div>
  );
};

export default LoginSignupLayout;

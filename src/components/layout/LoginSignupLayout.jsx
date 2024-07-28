import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginSignupLayout = () => {
  return (
    <div className="login-signup-layout">
      <Outlet />
    </div>
  );
};

export default LoginSignupLayout;

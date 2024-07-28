import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  return <AuthForm isRegister={false} handleSubmit={handleLogin} />;
};

export default Login;

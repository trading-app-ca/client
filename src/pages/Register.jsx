import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
  };

  return <AuthForm isRegister={true} handleSubmit={handleRegister} />;
};

export default Register;

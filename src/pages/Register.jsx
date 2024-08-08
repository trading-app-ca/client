import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('https://crypto-trader-server.onrender.com/api/auth/register', data);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.response?.data?.msg || 'An error occurred during registration');
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm isRegister={true} handleSubmit={handleRegister} />
    </>
  );
};

export default Register;

import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);

      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', response.data.token);  
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.msg || 'An error occurred during login');
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm isRegister={false} handleSubmit={handleLogin} />
    </>
  );
};

export default Login;

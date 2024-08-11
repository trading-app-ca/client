import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

    // Function to handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const result = await dispatch(loginUser(data)).unwrap();
      navigate('/dashboard'); // Redirect to dashboard if user is already authenticated
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    // Redirect to dashboard if user is already authenticated
    if (isAuthenticated) {
      navigate('/dashboard'); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Display error message if login status is 'failed' */}
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm isRegister={false} handleSubmit={handleLogin} />
    </>
  );
};

export default Login;

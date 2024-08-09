import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const result = await dispatch(loginUser(data)).unwrap();

      // If login is successful, navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // If login fails, the error will be handled by Redux state
      console.error('Login failed:', error);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm isRegister={false} handleSubmit={handleLogin} />
    </>
  );
};

export default Login;

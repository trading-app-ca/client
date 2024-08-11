import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const result = dispatch(registerUser(data));

    // Redirect to login page if registration is successful
    if (result.type === 'auth/registerUser/fulfilled') {
      navigate('/login');
    }
  };

  return (
    <>
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
      <AuthForm isRegister={true} handleSubmit={handleRegister} />
    </>
  );
};

export default Register;

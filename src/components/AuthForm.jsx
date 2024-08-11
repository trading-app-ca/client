import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/authSlice';

const AuthForm = ({ isRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  // Handles form submission and dispatches the appropriate Redux action
  const handleSubmit = async (formData) => {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // If the user is registering, also add first and last name
    if (isRegister) {
      data.firstName = formData.get('firstName');
      data.lastName = formData.get('lastName');
    }

    console.log('Submitting:', data);

    // Dispatch the appropriate action based on whether the user is registering or logging in
    const action = isRegister ? registerUser(data) : loginUser(data);

    // Handle the result of the action dispatch
    dispatch(action).then((result) => {
      console.log('Result:', result); 
      if (result.meta.requestStatus === 'fulfilled') {
        // Redirect to the appropriate page on success
        navigate(isRegister ? '/login' : '/dashboard');
      } else {
        // Log an error message if authentication fails
        console.error('Authentication failed:', result.payload);
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    handleSubmit(formData);
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        {/* Display the form header based on whether the user is registering or logging in */}
        <h1>{isRegister ? 'Sign up' : 'Sign in'}</h1>
        <p>
          {/* Display the appropriate link to switch between login and registration */}
          {isRegister ? (
            <>
              Already have an account? <Link to="/login">Login here.</Link>
            </>
          ) : (
            <>
              Don't have an account? <Link to="/register">Sign up.</Link>
            </>
          )}
        </p>
        {authError && <p className="error-message">{authError}</p>}
        <form onSubmit={onSubmit}>
          {isRegister && (
            <>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button className="btn lgt-btn" type="submit" disabled={authStatus === 'loading'}>
            {isRegister ? 'Create your account' : 'Sign in'}
          </button>
        </form>
        <div className="return-home">
          <Link to="/">Return to Home</Link>
        </div>
      </div>
      <div className="info-text">
        <h2>Crypto Trader</h2>
        <p>
          Our mission is to provide a safe and educational platform for aspiring traders to
          learn and practice cryptocurrency trading without any financial risk.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

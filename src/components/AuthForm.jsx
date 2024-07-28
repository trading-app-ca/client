import React from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({ isRegister, handleSubmit }) => {
  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>{isRegister ? 'Sign up' : 'Sign in'}</h1>
        <p>
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
        <form onSubmit={handleSubmit}>
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
          {isRegister && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
          )}
          <button className="btn lgt-btn" type="submit">
            {isRegister ? 'Create your account' : 'Sign in'}
          </button>
        </form>
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

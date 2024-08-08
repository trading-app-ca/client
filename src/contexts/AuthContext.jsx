import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('https://crypto-trader-server.onrender.com/api/user', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      .then(response => {
        setAuth({
          isAuthenticated: true,
          user: response.data,
          token: token,
        });
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        logout();
      });
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token);

    setAuth({
      isAuthenticated: true,
      user: userData,
      token: token,
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';
import { authLinks } from '../common/AuthLinks';
import { AuthContext } from '../../contexts/AuthContext';
import { usePortfolioData } from '../portfolio/PortfolioValue';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext); 
  const { isAuthenticated, user } = auth;
  const navigate = useNavigate();
  const { portfolioData, isLoading, error } = usePortfolioData(); 

  const handleScroll = (section) => {
    navigate('/');
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '#about', label: 'About', onClick: () => handleScroll('about') },
    { path: '#how-it-works', label: 'How It Works', onClick: () => handleScroll('how-it-works') },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Sign Up' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="Crypto Trader Logo" />
        </Link>
      </div>

      <FaBars size={40} className="dropdown-menu-icon" onClick={toggleMenu} />
      <MobileDropdown 
        isOpen={isMenuOpen} 
        onClose={toggleMenu} 
        links={isAuthenticated ? authLinks : guestLinks} 
        isAuth={isAuthenticated} 
      />

      {isAuthenticated && user && (
        <div className="auth-info">
          <h2>Welcome, <span className="highlight">{user.firstName} {user.lastName}.</span></h2>
          <p>Balance: <span className="highlight">${user.balance?.toFixed(2) || 'N/A'}</span></p>
          {!isLoading && !error && (
            <p>Portfolio Value: <span className="highlight">${portfolioData.portfolioValue?.toFixed(2) || '0.00'}</span></p>
          )}
          {isLoading && <p>Loading portfolio value...</p>}
          {error && <p>Error loading portfolio data.</p>}
        </div>
      )}

      <nav className="desktop-nav">
        {!isAuthenticated && (
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a onClick={() => handleScroll('about')}>About</a></li>
            <li><a onClick={() => handleScroll('how-it-works')}>How It Works</a></li>
          </ul>
        )}
      </nav>

      {isAuthenticated ? (
        <div className="auth-buttons">
          <button onClick={logout} className="logout btn">Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login btn">Login</Link>
          <Link to="/register" className="signup btn">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

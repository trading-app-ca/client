import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';
import { authLinks } from '../common/AuthLinks';
import { fakeCustomerData } from '../../data'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { name: customerName, balance: accountBalance, portfolioValue } = fakeCustomerData; 

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

  const isAuthenticated = false; 

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

      {isAuthenticated && (
        <div className="auth-info">
          <h2>Welcome, <span className="highlight">{customerName}.</span></h2>
          <p>Balance: <span className="highlight">${accountBalance.toFixed(2)}</span></p>
          <p>Portfolio Value: <span className="highlight">${portfolioValue.toFixed(2)}</span></p>
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

      {!isAuthenticated && (
        <div className="auth-buttons">
          <Link to="/login" className="login btn">Login</Link>
          <Link to="/register" className="signup btn">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';

const Header = () => {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const authLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/trade', label: 'Trade' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/deposit-withdraw', label: 'Deposit/Withdraw' },
    { path: '/account-settings', label: 'Account Settings' },
    { path: '/logout', label: 'Logout' },
  ];

  const toggleGuestMenu = () => {
    setIsGuestMenuOpen(!isGuestMenuOpen);
  };

  const toggleAuthMenu = () => {
    setIsAuthMenuOpen(!isAuthMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="Crypto Trader Logo" />
        </Link>
      </div>
      
      <FaBars size={40} className="dropdown-menu-icon" onClick={toggleGuestMenu} />
      {/* <FaBars size={40} className="dropdown-menu-icon" onClick={toggleAuthMenu} /> */}

      <MobileDropdown isOpen={isGuestMenuOpen} onClose={toggleGuestMenu} links={guestLinks} isAuth={false} />
      <MobileDropdown isOpen={isAuthMenuOpen} onClose={toggleAuthMenu} links={authLinks} isAuth={true} />

      <nav className="desktop-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a onClick={() => handleScroll('about')}>About</a></li>
          <li><a onClick={() => handleScroll('how-it-works')}>How It Works</a></li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <Link to="/login" className="login btn">Login</Link>
        <Link to="/register" className="signup btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';

const Header = () => {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);

  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
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
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
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

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">Crypto Trader</Link>
      </div>
      <div className="nav-links">
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;

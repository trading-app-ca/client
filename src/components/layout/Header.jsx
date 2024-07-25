import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="Crypto Trader Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="signup">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;

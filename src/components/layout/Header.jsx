import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">Crypto Trader</Link>
      </div>
      <div className="header__user-info">
        <Link to="/sign-in-sign-up">Sign In</Link>
        <Link to="/sign-in-sign-up">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;

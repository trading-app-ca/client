import React from 'react';
import { Link } from 'react-router-dom';

const MobileDropDownGuest = () => {
  return (
    <div className="mobile-menu">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileDropDownGuest;

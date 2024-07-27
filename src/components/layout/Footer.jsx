import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="newsletter">
          <h3>Subscribe to our newsletter</h3>
          <form>
            <input type="email" placeholder="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <nav className="nav">
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/login">Login</Link>
        </nav>
        <div className="social">
          <h3>Follow us</h3>
          <div className="icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter.png" alt="Twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.png" alt="Facebook" />
            </a>
          </div>
        </div>
        <div className="contact">
          <p>Contact: email@example.com | Phone: 1234 567 890</p>
        </div>
        <div className="logo">
          <img src="/logo.png" alt="Crypto Trader" />
          <p>© 2024 Crypto Trader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

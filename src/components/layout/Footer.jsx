import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="nav">
          <Link to="/about">About</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/login">Login</Link>
        </nav>
        <div className="content-row">
          <div className="left-column">
            <div className="newsletter">
              <h3>Subscribe to our newsletter</h3>
              <form>
                <input type="email" placeholder="Email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="right-column">
            <div className="social">
              <h3>Follow us</h3>
              <div className="icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>
            </div>
            <div className="logo">
              <img src="/logo.png" alt="Crypto Trader" />
            </div>
          </div>
        </div>
        <div className="bottom-row">
          <div className="contact">
            <p>Contact: email@example.com | Phone: 1234 567 890</p>
          </div>
            <p>© 2024 Crypto Trader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

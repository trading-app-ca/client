import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import NewsletterSubscription from '../common/NewsletterSubscription';

const Footer = () => {
  const navigate = useNavigate();

  const handleScroll = (section) => {
    navigate('/');
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav className="nav">
          <a onClick={() => handleScroll('about')}>About</a>
          <a onClick={() => handleScroll('how-it-works')}>How It Works</a>
          <a href="/login">Login</a>
        </nav>
        <div className="content-row">
          <div className="left-column">
            <NewsletterSubscription />
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
        <div className="row">
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

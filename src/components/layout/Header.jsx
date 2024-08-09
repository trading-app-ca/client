import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';
import { authLinks, guestLinks } from '../common/NavLinks';
import { logout } from '../../redux/authSlice';
import { usePortfolioData } from '../portfolio/PortfolioValue';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { portfolioData, isLoading, error } = usePortfolioData();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleScroll = (section) => {
    navigate('/');
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        links={isAuthenticated ? authLinks : guestLinks.map(link => ({ ...link, onClick: link.onClick ? () => link.onClick(handleScroll) : null }))}
        isAuth={isAuthenticated} 
      />

      {isAuthenticated && user && (
        <div className="auth-info">
          <h2>Welcome, <span className="highlight">{user.firstName} {user.lastName}.</span></h2>
          <p>Balance: <span className="highlight">${user.balance?.toFixed(2) || 'N/A'}</span></p>
          {!isLoading && !error && (
            <p>Portfolio Value: <span className="highlight">${portfolioData.portfolioValue?.toFixed(2) || '0.00'}</span></p>
          )}
          {isLoading && <p>Loading portfolio value...</p>}
          {error && <p>Error loading portfolio data.</p>}
        </div>
      )}

      <nav className="desktop-nav">
        {!isAuthenticated && (
          <ul>
            {guestLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} onClick={link.onClick ? () => link.onClick(handleScroll) : null}>{link.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {isAuthenticated ? (
        <div className="auth-buttons">
          <button onClick={handleLogout} className="logout btn">Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login btn">Login</Link>
          <Link to="/register" className="signup btn">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;

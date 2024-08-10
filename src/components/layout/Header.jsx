import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';
import { authLinks, guestLinks } from '../common/NavLinks';
import { logout } from '../../redux/authSlice';
import { usePortfolioData } from '../portfolio/PortfolioValue';
import LogoutConfirmationModal from '../common/LogoutConfirmationModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { portfolioData, isLoading, error } = usePortfolioData();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    closeLogoutModal();
    handleLogout();
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
        links={isAuthenticated ? authLinks : guestLinks} 
        isAuth={isAuthenticated}
        onLogout={openLogoutModal}
      />

      {isAuthenticated && user && (
        <div className="auth-info">
          <h2>Welcome, <span className="highlight">{user.firstName} {user.lastName}.</span></h2>
          <p>Balance: <span className="highlight">${user.balance?.toFixed(2) || 'N/A'}</span></p>
          {!isLoading && !error && (
            <p>Portfolio Value: <span className="highlight">${portfolioData.portfolioValue?.toFixed(2) || '0.00'}</span></p>
          )}
        </div>
      )}

      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </header>
  );
};

export default Header;

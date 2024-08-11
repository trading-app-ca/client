import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import MobileDropdown from './MobileDropdown';
import { authLinks, guestLinks, loginRegisterLinks } from '../common/NavLinks';
import { logout } from '../../redux/authSlice';
import { fetchUserBalance } from '../../redux/depositWithdrawSlice';
import { usePortfolioData } from '../portfolio/PortfolioValue';
import LogoutConfirmationModal from '../common/LogoutConfirmationModal';

const Header = () => {
  // State to manage the mobile menu and logout modal visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing authentication and user info from Redux state
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.depositWithdraw); 
  const { portfolioData, isLoading, error } = usePortfolioData();

  // useEffect to fetch user balance when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserBalance()); 
    }
  }, [dispatch, isAuthenticated]);

  // Handle logout action
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

  // Toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle logout modal
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Confirm and handle the logout process
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
        loginRegisterLinks={!isAuthenticated ? loginRegisterLinks : []}
        onLogout={openLogoutModal}
      />

      {isAuthenticated && user && (
        <div className="auth-info">
          <h2>Welcome, <span className="highlight">{user.firstName} {user.lastName}.</span></h2>
          <p>Balance: <span className="highlight">${balance?.toFixed(2) || 'N/A'}</span></p>
          <p>Portfolio Value: <span className="highlight">${!isLoading && portfolioData?.portfolioValue ? portfolioData.portfolioValue.toFixed(2) : '0.00'}</span></p>
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

      {!isAuthenticated && (
        <div className="auth-buttons">
          <Link to="/login" className="login btn">Login</Link>
          <Link to="/register" className="signup btn">Sign Up</Link>
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

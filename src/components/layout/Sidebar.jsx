import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLinks } from '../common/NavLinks'; 
import LogoutConfirmationModal from '../common/LogoutConfirmationModal';
import { logout } from '../../redux/authSlice';
// Sidebar component used on authenticated pages on the desktop
const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    closeLogoutModal();
    dispatch(logout());
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <nav className="sidebar__nav">
          {authLinks.map(link => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick(openLogoutModal); } : null}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Render Logout Confirmation Modal */}
      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </aside>
  );
};

export default Sidebar;

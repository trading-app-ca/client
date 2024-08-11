import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
// Mobile dropdown menu component
const MobileDropdown = ({ isOpen, onClose, links, loginRegisterLinks = [], onLogout }) => {
  const combinedLinks = [...links, ...loginRegisterLinks];

  return (
    <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
      <div className="dropdown-menu-card">
        <FaTimes size={40} className="close-icon" onClick={onClose} />
        <nav className="dropdown-menu-nav">
          <ul className="dropdown-menu-links">
            {combinedLinks.map((link, index) => (
              <li key={index}>
                {link.label === 'Logout' ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLogout(); 
                      onClose(); 
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileDropdown;

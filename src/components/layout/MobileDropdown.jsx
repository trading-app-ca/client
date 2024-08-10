import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const MobileDropdown = ({ isOpen, onClose, links, onLogout }) => {
  return (
    <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
      <div className="dropdown-menu-card">
        <FaTimes size={40} className="close-icon" onClick={onClose} />
        <nav className="dropdown-menu-nav">
          <ul className="dropdown-menu-links">
            {links.map((link, index) => (
              <li key={index}>
                {link.label === 'Logout' ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onLogout(); // Call the logout modal open function
                      onClose(); // Close the dropdown
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

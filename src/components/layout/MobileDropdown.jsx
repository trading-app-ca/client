import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const MobileDropdown = ({ isOpen, onClose, links, isAuth }) => {
  return (
    <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
      <div className="dropdown-menu-card">
        <FaTimes size={40} className="close-icon" onClick={onClose} />
        <nav className="dropdown-menu-nav">
          <ul className="dropdown-menu-links">
            {links.map((link, index) => (
              <li key={index}>
                {isAuth ? (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                ) : link.onClick ? (
                  <a onClick={() => { link.onClick(); onClose(); }}>
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.path} onClick={onClose}>
                    {link.label}
                  </Link>
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

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import MainBackground from '../common/MainBackground';

const MobileDropdown = ({ isOpen, onClose, links, isAuth }) => {
  return (
    <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
      <MainBackground>
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
      </MainBackground>  
    </div>
  );
};

export default MobileDropdown;

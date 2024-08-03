import React from 'react';
import { NavLink } from 'react-router-dom';
import { authLinks } from '../common/AuthLinks';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <nav className="sidebar__nav">
          {authLinks.map(link => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

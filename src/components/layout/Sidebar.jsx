import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink>
        <NavLink to="/trade" activeClassName="active">Trade</NavLink>
        <NavLink to="/transactions" activeClassName="active">Transactions</NavLink>
        <NavLink to="/deposit-withdraw" activeClassName="active">Deposit/Withdraw</NavLink>
        <NavLink to="/account-settings" activeClassName="active">Account Settings</NavLink>
        <NavLink to="/login" activeClassName="active">Sign In</NavLink>
        <NavLink to="/register" activeClassName="active">Sign Up</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

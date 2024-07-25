import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileDropdownAuth = ({ isOpen, closeMenu }) => {
  return (
    <div className="mobile-menu-auth">
      <nav>
        <ul>
          <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
          <li><NavLink to="/portfolio" activeClassName="active">Portfolio</NavLink></li>
          <li><NavLink to="/trade" activeClassName="active">Trade</NavLink></li>
          <li><NavLink to="/transactions" activeClassName="active">Transactions</NavLink></li>
          <li><NavLink to="/deposit-withdraw" activeClassName="active">Deposit/Withdraw</NavLink></li>
          <li><NavLink to="/account-settings" activeClassName="active">Account Settings</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileDropdownAuth;

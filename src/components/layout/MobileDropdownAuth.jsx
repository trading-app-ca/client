import React from 'react';
import { NavLink } from 'react-router-dom';
const MobileDropdownAuth = ({ isOpen, closeMenu }) => {
	return (
		<div className={`mobile-menu-auth ${isOpen ? 'open' : ''}`}>
			<nav>
				<ul>
					<li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
					<li><NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>Portfolio</NavLink></li>
					<li><NavLink to="/trade" className={({ isActive }) => (isActive ? 'active' : '')}>Trade</NavLink></li>
					<li><NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : '')}>Transactions</NavLink></li>
					<li><NavLink to="/deposit-withdraw" className={({ isActive }) => (isActive ? 'active' : '')}>Deposit/Withdraw</NavLink></li>
					<li><NavLink to="/account-settings" className={({ isActive }) => (isActive ? 'active' : '')}>Account Settings</NavLink></li>
					<li><NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink></li>
				</ul>
			</nav>
		</div>
	);
};

export default MobileDropdownAuth;

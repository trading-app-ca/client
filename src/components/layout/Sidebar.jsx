import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar__nav">
				<NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
				<NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>Portfolio</NavLink>
				<NavLink to="/trade" className={({ isActive }) => (isActive ? 'active' : '')}>Trade</NavLink>
				<NavLink to="/transactions" className={({ isActive }) => (isActive ? 'active' : '')}>Transactions</NavLink>
				<NavLink to="/deposit-withdraw" className={({ isActive }) => (isActive ? 'active' : '')}>Deposit/Withdraw</NavLink>
				<NavLink to="/account-settings" className={({ isActive }) => (isActive ? 'active' : '')}>Account Settings</NavLink>
				<NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
			</nav>
        </aside>
    );
};

export default Sidebar;

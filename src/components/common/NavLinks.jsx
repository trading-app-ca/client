export const authLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/trade', label: 'Trade' },
  { path: '/transactions', label: 'Transactions' },
  { path: '/deposit-withdraw', label: 'Deposit/Withdraw' },
  { path: '/account-settings', label: 'Account Settings' },
  {
    path: '#',
    label: 'Logout',
    onClick: (openLogoutModal) => openLogoutModal(), 
  },
];


export const guestLinks = [
  { path: '/', label: 'Home' },
  { path: '#about', label: 'About', onClick: (handleScroll) => handleScroll('about') },
  { path: '#how-it-works', label: 'How It Works', onClick: (handleScroll) => handleScroll('how-it-works') },
];

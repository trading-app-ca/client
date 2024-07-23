import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Trade from './pages/Trade';
import Transactions from './pages/Transactions';
import DepositWithdraw from './pages/DepositWithdraw';
import AccountSettings from './pages/AccountSettings';
import SignInSignUpPage from './pages/SignInSignUpPage';
import './styles/style.scss';


function LayoutComponent() {
  return (
    <div className="app">
      <Header />
        <div className="main-content">
          <Sidebar />
          <div className="page-content">
            <Outlet /> {/* Nested routes render here */}
          </div>
        </div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  { 
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'trade',
        element: <Trade />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'deposit-withdraw',
        element: <DepositWithdraw />,
      },
      {
        path: 'account-settings',
        element: <AccountSettings />,
      },
      {
        path: 'sign-in-sign-up',
        element: <SignInSignUpPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
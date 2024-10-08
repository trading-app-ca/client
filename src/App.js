import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store'; 
import { initialiseAuth, fetchUserData } from './redux/authSlice';
import AuthUserLayout from './components/layout/AuthUserLayout';
import GuestLayout from './components/layout/GuestLayout';
import LoginSignupLayout from './components/layout/LoginSignupLayout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Trade from './pages/Trade';
import Transactions from './pages/Transactions';
import DepositWithdraw from './pages/DepositWithdraw';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <HomePage />, // Default route for guests (home page)
      },
    ],
  },
  {
    path: '/',
    element: <LoginSignupLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />, // Redirect unknown routes to dashboard
      },
    ],
  },
  {
    path: '/',
    element: <AuthUserLayout />,
    children: [
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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // Page for unknown routes (404 Not Found)
  },
]);

function AppInitialiser() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialise authentication status and fetch user data if authenticated
    dispatch(initialiseAuth());
    if (isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [dispatch, isAuthenticated]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppInitialiser />
    </Provider>
  );
}

export default App;

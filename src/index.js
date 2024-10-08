import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import App from './App';
import store from './redux/store';
import './styles/style.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
    <App />
  </Provider>
);

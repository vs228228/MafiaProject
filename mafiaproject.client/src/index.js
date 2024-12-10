import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './fetchInterceptor';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <App />
  </Router>
);

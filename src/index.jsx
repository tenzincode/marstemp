import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Use React 19's createRoot API
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

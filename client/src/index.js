import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 cambia esto
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // 👈 usa createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

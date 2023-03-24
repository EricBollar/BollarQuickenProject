import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// this is most up-to-date react render method
// rendering an App function which is 'parent' to every React component

const root = ReactDOM.createRoot(document.getElementById('react-entry'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
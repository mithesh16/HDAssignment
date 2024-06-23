import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import toast, { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
   
  </React.StrictMode>
);


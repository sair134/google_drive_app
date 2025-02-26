import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Error from './Error';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={Error}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { applyTheme } from './design-system/applyTheme';
import './styles.css';

applyTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

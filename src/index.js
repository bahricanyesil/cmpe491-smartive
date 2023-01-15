import React from 'react';
import ReactDOM from 'react-dom/client';
import { ProSidebarProvider } from 'react-pro-sidebar';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProSidebarProvider>
  <App />
</ProSidebarProvider>
);

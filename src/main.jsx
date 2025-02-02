import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AppProvider from './components/AppProvider.jsx';
import LocationList from './components/LocationList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LocationList />,
  },
  {
    path: '/chi-tiet/:locationCode',
    element: <App />,
  },
  {
    path: '/vi-tri-hien-tai',
    element: <App />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);

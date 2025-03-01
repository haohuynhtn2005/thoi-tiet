import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AppProvider from './components/AppProvider.jsx';
import LocationList from './components/LocationList.jsx';
import ErrorComponent from './components/ErrorComponent.jsx';
import ShowWeather from './components/ShowWeather.jsx';
import Manage from './components/Manage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent message='404 not found' />,
    children: [
      { index: true, element: <LocationList /> },
      { path: '/vi-tri-hien-tai', element: <ShowWeather /> },
      { path: '/chi-tiet/:locationCode', element: <ShowWeather /> },
    ],
  },
  {
    path: '/manage',
    element: <Manage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);

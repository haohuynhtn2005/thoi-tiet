import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AppProvider from './providers/AppProvider.jsx';
import LocationList from './components/weather/LocationList.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ShowWeather from './components/weather/ShowWeather.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Role from './components/auth/Role.jsx';
import Register from './pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage message="404 not found" />,
    children: [
      { index: true, element: <LocationList /> },
      { path: '/vi-tri-hien-tai', element: <ShowWeather /> },
      { path: '/chi-tiet/:locationCode', element: <ShowWeather /> },
    ],
  },
  {
    path: '/quan-ly',
    element: (
      <Role
        allowedRoles={['staff', 'admin']}
        loginRedirect="/dang-nhap"
        Comp={Dashboard}
      />
    ),
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: '/dang-nhap',
    element: <Login />,
  },
  {
    path: '/dang-ky',
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);

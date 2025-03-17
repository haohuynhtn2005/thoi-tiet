import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import AppProvider from './providers/AppProvider.jsx';
import LocationList from './components/weather/LocationList.jsx';
import ShowWeather from './components/weather/ShowWeather.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Role from './components/auth/Role.jsx';
import Register from './pages/Register.jsx';
import Overview from './components/dash/Overview.jsx';
import LocationDash from './components/dash/LocationDash.jsx';
import NewsDash from './components/dash/NewsDash.jsx';
import NewsPage from './components/news/NewsPage.jsx';
import ShowNews from './components/news/ShowNews.jsx';
import UserDash from './components/dash/UserDash.jsx';
import StaffDash from './components/dash/StaffDash.jsx';
import Profile from './components/profile/Profile.jsx';
import Auth from './components/auth/Auth.jsx';
import MyNews from './components/news/MyNews.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LocationList /> },
      { path: '/vi-tri-hien-tai', element: <ShowWeather /> },
      { path: '/chi-tiet/:locationCode', element: <ShowWeather /> },
      { path: '/tin-tuc', element: <NewsPage /> },
      { path: '/tin-tuc/:id', element: <ShowNews /> },
      { path: '/ho-so', element: <Auth Comp={Profile} /> },
      { path: '/bai-dang', element: <Auth Comp={MyNews} /> },
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
    children: [
      { index: true, element: <Overview /> },
      { path: 'khu-vuc', element: <LocationDash /> },
      { path: 'nguoi-dung', element: <UserDash /> },
      { path: 'nhan-vien', element: <StaffDash /> },
      { path: 'tin-tuc', element: <NewsDash /> },
    ],
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

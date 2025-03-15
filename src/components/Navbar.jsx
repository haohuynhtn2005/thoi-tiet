import { Link } from 'react-router-dom';
import { domain } from '../common/commonVal';
import { useContext } from 'react';
import { DarkModeContext, UserContext } from '../providers/AppProvider';
import DarkSwitch from './common/DarkSwitch';

export default function Navbar() {
  const { user, fetchUser } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const logout = async () => {
    try {
      const response = await fetch(`${domain}/logout`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status >= 400) {
        throw new Error((await response.json()).message);
      }
      fetchUser();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary border-3 border-bottom shadow-sm">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          <img
            src={darkMode ? '/assets/logo-dark.svg' : '/assets/logo.svg'}
            alt="Logo"
            className=" h-100"
            // style={{ height: '2em' }}
          />
          {/* Wea */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
              >
                Khu vuc
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/tin-tuc"
                className="nav-link"
              >
                Tin tuc
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    to={'/dang-nhap'}
                    className="nav-link"
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={'/dang-ky'}
                    className="nav-link"
                  >
                    Đăng ky
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="nav-link"
                  >
                    Đăng xuat
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    to={'/dang-ky'}
                    className="nav-link"
                  >
                    Tai khoan {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={'/quan-ly'}
                    className="nav-link"
                  >
                    Quan ly
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item align-self-center">
              <DarkSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

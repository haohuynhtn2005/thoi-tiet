import { Outlet, useNavigate } from 'react-router-dom';
import { DarkModeContext, UserContext } from '../../providers/AppProvider';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function Loading() {
  return (
    <div
      className="spinner-border"
      style={{ width: '3rem', height: '3rem' }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

const Role = ({ allowedRoles, loginRedirect, Comp }) => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  let isValidRole = false;
  if (user) {
    isValidRole = allowedRoles.includes(user?.role);
  }

  useEffect(() => {
    const callbackToReturn = () => {
      Swal.close();
    };
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Bạn chưa đăng nhập',
        text: 'Đến trang đăng nhập',
        confirmButtonColor: '#0d6efd',
        theme: darkMode && 'dark',
      }).then((res) => {
        if (res.dismiss || res.isConfirmed) {
          navigate(loginRedirect);
        }
      });
      return callbackToReturn;
    }
    if (!isValidRole) {
      Swal.fire({
        icon: 'warning',
        title: 'Bạn không có quyền truy cập',
        text: 'Quay về trang chủ',
        confirmButtonColor: '#0d6efd',
        theme: darkMode && 'dark',
      }).then((res) => {
        if (res.dismiss || res.isConfirmed) {
          navigate('/');
        }
      });
    }

    return callbackToReturn;
  }, [user, navigate, loginRedirect, darkMode, isValidRole]);

  if (!user) {
    return <Loading />;
  }
  if (!isValidRole) {
    return <Loading />;
  }

  return (
    <Comp>
      <Outlet />
    </Comp>
  );
};

Role.propTypes = {
  allowedRoles: PropTypes.array,
  loginRedirect: PropTypes.string,
  Comp: PropTypes.func,
};

export default Role;

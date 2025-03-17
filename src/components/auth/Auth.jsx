import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DarkModeContext, UserContext } from '../../providers/AppProvider';
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

const Auth = ({ redirectTo = '/dang-nhap', Comp }) => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

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
          navigate(redirectTo);
        }
      });
      return callbackToReturn;
    }

    return callbackToReturn;
  }, [user, navigate, redirectTo, darkMode]);

  if (!user) {
    return <Loading />;
  }
  return (
    <Comp>
      <Outlet />
    </Comp>
  );
};

Auth.propTypes = {
  redirectTo: PropTypes.string,
  Comp: PropTypes.func,
};

export default Auth;

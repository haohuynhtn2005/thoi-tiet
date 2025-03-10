import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../providers/AppProvider';
import PropTypes from 'prop-types';

const Auth = ({ redirectTo = '/dang-nhap' }) => {
  const { user } = useContext(UserContext);
  return !user ? (
    <Navigate
      to={redirectTo}
      replace
    />
  ) : (
    <Outlet />
  );
};

Auth.propTypes = {
  redirectTo: PropTypes.string,
};

export default Auth;

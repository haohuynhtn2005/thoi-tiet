import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { domain } from '../common/commonVal';

function useLogout() {
  const { fetchUser } = useUser();
}

export default function Navbar() {
  const { user, fetchUser } = useUser();

  const logout = async () => {
    try {
      const response = await fetch(`${domain}/logout`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status >= 400) {
        throw new Error((await response.json()).message);
      }
      fetchUser();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  if (user == null) {
    return (
      <div>
        <Link
          to={'/dang-nhap'}
          className="btn bg-body-secondary"
        >
          Đăng nhập
        </Link>
        <Link
          to={'/dang-ky'}
          className="btn bg-body-secondary"
        >
          Đăng ký
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
      <button
        onClick={logout}
        className="btn bg-body-secondary"
      >
        Đăng xuất
      </button>
      <Link
        to="/quan-ly"
        className="btn bg-body-secondary"
      >
        Quản lý
      </Link>
    </div>
  );
}

import { useContext, useState } from 'react';
import { domain } from '../common/commonVal';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../common/firebase.js';
import { signInWithPopup, getIdToken } from 'firebase/auth';
import { DarkModeContext, UserContext } from '../providers/AppProvider';
import Swal from 'sweetalert2';

export default function Login() {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { fetchUser } = useContext(UserContext);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(result.user);

      const res = await fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công',
        text: `Đã đăng nhập google thành công ${data.user.email}`,
        confirmButtonColor: '#0d6efd',
        theme: darkMode && 'dark',
      }).then((res) => {
        if (res.dismiss || res.isConfirmed) {
          fetchUser();
          navigate('/');
        }
      });
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${domain}/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (res.status == 400) {
        return setMessage((await res.json()).message);
      } else if (!res.ok) {
        throw new Error((await res.json()).message);
      }
      fetchUser();
      // const data = await response.json();
      // console.log(data);
      navigate('/');
    } catch (e) {
      console.log('Loi dang nhap', e);
      setMessage(e.message);
    }
  };

  return (
    <div
      className="pt-5"
      style={{
        backgroundImage: `url(/assets/background/${
          darkMode ? 'overlay-dark.jpg' : 'overlay.jpg'
        }`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-9 col-md-8 col-lg-6 col-xl-4">
            <div className="card shadow-lg bg-body-tertiary bg-opacity-50">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">
                  <Link to="/">
                    <img
                      src={
                        darkMode ? '/assets/logo-dark.svg' : '/assets/logo.svg'
                      }
                      className="m-auto"
                    />
                  </Link>
                </h2>
                <form
                  action={`${domain}/login`}
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  {/* Email input */}
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      className="form-control bg-body-tertiary bg-opacity-75"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="on"
                    />
                  </div>
                  {/* Password input */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label"
                    >
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control bg-body-tertiary bg-opacity-75"
                      id="password"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-passoword"
                    />
                    <div className="form-text mt-2">
                      <a
                        href="#"
                        className="text-decoration-none"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                  {/* Remember me checkbox */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberMe"
                    >
                      Ghi nhớ
                    </label>
                  </div>
                  <div className=" text-danger">{message}</div>
                  {/* Submit button */}
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      onClick={loginWithGoogle}
                      className="btn btn-light"
                    >
                      <i className="bi bi-google"></i> Google
                    </button>
                  </div>
                  {/* Sign up link */}
                  <div className="text-center mt-3">
                    <p className="mb-0">
                      Không có tài khoản?{' '}
                      <Link
                        to="/dang-ky"
                        className="text-decoration-underline link-info link-underline-info"
                      >
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

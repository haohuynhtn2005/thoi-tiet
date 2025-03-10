import { useContext, useState } from 'react';
import { domain } from '../common/commonVal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/AppProvider';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const { fetchUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword != formData.password) {
      setMessage('Xac nhan mat khau khong khop')
      return
    }
    try {
      const res = await fetch(`${domain}/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (!res.ok) {
        const rs = await res.json()
        const e = new Error(rs.error);
        e.response = rs;
        throw e;
      }
      fetchUser();
      setMessage('Dang ky thanh cong')
      // navigate('/');
    } catch (e) {
      console.error('Loi dang ky', {...e});
      setMessage(e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Đăng ký</h2>
              <form
                action={`${domain}/login`}
                method="POST"
                onSubmit={handleSubmit}
              >
                {/* Name input */}
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="form-label"
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Tên người dùng"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                </div>
                {/* Email input */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
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
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-passoword"
                  />
                </div>
                {/* confirm password input */}
                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    autoComplete="current-passoword"
                  />
                </div>

                <div className=" text-danger">{message}</div>
                {/* Submit button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Dang ky
                  </button>
                </div>
                {/* Sign up link */}
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Don&apos;t have an account?{' '}
                    <a
                      href="/dang-nhap"
                      className="text-decoration-none"
                    >
                      Dang nhap
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

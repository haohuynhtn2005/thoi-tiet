import { useContext, useState } from 'react';
import { domain } from '../common/commonVal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/AppProvider';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { fetchUser } = useContext(UserContext);

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>
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
                  <div className="form-text mt-2">
                    <a
                      href="#"
                      className="text-decoration-none"
                    >
                      Forgot password?
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
                    Remember me
                  </label>
                </div>
                <div className=" text-danger">{message}</div>
                {/* Submit button */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
                {/* Sign up link */}
                <div className="text-center mt-3">
                  <p className="mb-0">
                    Don&apos;t have an account?{' '}
                    <a
                      href="#"
                      className="text-decoration-none"
                    >
                      Sign up
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

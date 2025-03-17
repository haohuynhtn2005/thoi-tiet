import { useContext, useState } from 'react';
import { domain } from '../../common/commonVal';
import { DarkModeContext, UserContext } from '../../providers/AppProvider';

const Profile = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Tên là bắt buộc';
    if (!formData.email.trim()) tempErrors.email = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      tempErrors.email = 'Email không hợp lệ';
    if (formData.password && formData.password.length < 8)
      tempErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = 'Mật khẩu không khớp';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch(`${domain}/update-profile`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setMessage((await res.json()).message);
    } catch (error) {
      console.log(error);
      setMessage(error.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div
      className="container-fluid pt-5"
      style={{
        height: '100%',
        backgroundImage: `url(/assets/background/${
          darkMode ? 'bg-dark' : 'bg-light'
        }.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      {message && <div className="alert alert-info">{message}</div>}
      <div className="row justify-content-center">
        <div className="col-sm-9 col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg bg-body-tertiary bg-opacity-50">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Cập nhật hồ sơ</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

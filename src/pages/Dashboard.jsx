import { Link, Outlet } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';
import { Fragment } from 'react';
import DarkSwitch from '../components/common/DarkSwitch';

function SidebarContent() {
  return (
    <Fragment>
      <div className="offcanvas-header pb-0">
        <h5
          className="offcanvas-title"
          id="staticBackdropLabel"
        >
          <button className="btn text-light btn-sm me-1">
            <i className="bi bi-brightness-low-fill fs-5"></i>
          </button>
          <Link to="/quan-ly">Dashboard</Link>
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white d-lg-none"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-house-fill"></i>&nbsp;Trang chủ
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/quan-ly"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-peace-fill"></i>&nbsp;Tong quan
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/dashboard"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-clipboard-data-fill"></i>&nbsp;Thống kê
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/dashboard"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-person-fill"></i>&nbsp;Người dùng
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/dashboard"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-journal-bookmark-fill"></i>&nbsp;Nhân viên
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="khu-vuc"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-compass-fill"></i>&nbsp;Khu vực
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas">
          <Link
            to="/dashboard"
            className="d-block p-2 rounded"
          >
            <i className="bi bi-newspaper"></i>&nbsp;Tin tức
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default function Dashboard() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div
        className={`dash offcanvas offcanvas-start text-white ${styles.sidebar}`}
        data-bs-backdrop="static"
        tabIndex={-1}
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
        style={{
          gridArea: '1 / 1 / 3 / 2',
          backgroundColor: '#4e73df',
        }}
      >
        <SidebarContent />
      </div>

      <div className="d-flex align-items-center justify-content-between border-bottom shadow-sm p-1">
        <div>
          <button
            className="btn bg-body-secondary border d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
        <div className="d-flex gap-2">
          <div className="dropdown">
            <button
              className="btn bg-body-secondary rounded-pill dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-workspace"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                >
                  Hồ sơ
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
          <div className="align-self-center">
            <DarkSwitch />
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import darkThemeSelect from '../common/darkThemeSelect.js';
import {
  DarkModeContext,
  LocationOpts,
  ModeContext,
  WeatherInfoContext,
} from './AppProvider.jsx';
import { useContext } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { locationOpts } = useContext(LocationOpts);
  const { mode, setMode } = useContext(ModeContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { weatherInfo } = useContext(WeatherInfoContext);

  return (
    <section className="content-wrapper">
      <div className="d-flex flex-column flex-sm-row gap-1 mb-2">
        <Link
          to="/"
          className="flex-shrink-0 me-1"
        >
          <img
            src={darkMode ? '/assets/logo-dark.svg' : '/assets/logo.svg'}
            alt="Logo"
            style={{ height: '2em' }}
          />
        </Link>
        <div style={{ flex: 1 }}>
          <Select
            options={locationOpts}
            value={''}
            onChange={(selectOption) => {
              navigate(`/chi-tiet/${encodeURI(selectOption.value)}`);
            }}
            placeholder="Tỉnh/Thành phố"
            styles={darkMode && darkThemeSelect}
          />
        </div>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          name="mode"
          className="form-select bg-body-tertiary"
          style={{ width: 'fit-content' }}
        >
          <option value="metric">Metric (°C, km)</option>
          <option value="us">US (°F, miles)</option>
          <option value="uk">UK (°C, miles)</option>
        </select>

        {/* Nút bật/tắt dark mode */}
        <label className="ui-switch align-self-sm-center my-1">
          <input
            type="checkbox"
            name="darkMode"
            checked={darkMode}
            onChange={() => {
              setDarkMode(!darkMode);
            }}
          />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
      <div className="d-sm-flex justify-content-between">
        <div>
          <i className="bi bi-geo-alt-fill"></i> Vị trí:{' '}
          {weatherInfo?.resolvedAddress}
        </div>
        <Link
          to="/vi-tri-hien-tai"
          className="btn bg-body-tertiary border"
        >
          <i className="bi bi-crosshair"></i> Lấy vị trí hiện tại
        </Link>
      </div>
    </section>
  );
}

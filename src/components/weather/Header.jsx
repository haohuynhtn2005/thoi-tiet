import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import darkThemeSelect from '../../common/darkThemeSelect.js';
import { DarkModeContext, ModeContext } from '../../providers/AppProvider.jsx';
import { LocationOptsContext, WeatherInfoContext } from '../../App.jsx';
import { useContext } from 'react';
import DarkSwitch from '../common/DarkSwitch.jsx';

export default function Header() {
  const navigate = useNavigate();
  const { locationOpts } = useContext(LocationOptsContext);
  const { mode, setMode } = useContext(ModeContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { weatherInfo } = useContext(WeatherInfoContext);

  return (
    <section className="mb-2">
      <div className="d-flex flex-column flex-sm-row gap-1 mb-2">
        {/* <Link
          to="/"
          className="flex-shrink-0 me-1"
        >
          <img
            src={darkMode ? '/assets/logo-dark.svg' : '/assets/logo.svg'}
            alt="Logo"
            style={{ height: '2em' }}
          />
        </Link> */}
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

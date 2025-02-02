import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import citys from '../js/citys.js';
import darkThemeSelect from '../js/darkThemeSelect.js';

export default function Header({ fetchWeatherInfo, changeMode, toggleDarkMode, darkMode }) {
  const navigate = useNavigate();
  const { city } = useParams();
  const [currentCity, setCurrentCity] = useState('');
  const [logoSrc, setLogoSrc] = useState("/assets/logo.svg"); // State lưu đường dẫn logo

  // Cập nhật logo khi dark mode thay đổi
  useEffect(() => {
    setLogoSrc(darkMode ? "/assets/logo-dark.svg" : "/assets/logo.svg");
  }, [darkMode]);

  async function getCurrentCity(abortController = AbortController.prototype) {
    if (!navigator.geolocation) {
      // alert('Thiết bị không hỗ trợ truy cập vị trí');
      navigate(`/${encodeURI('ho-chi-minh')}`);
      return;
    }
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        try {
          let url = `http://1api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=88d8c3a16490d6e5ba6e293820f3a903`;
          const response = await fetch(url, { signal: abortController.signal });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const data = await response.json();
          setCurrentCity(data[0].name);
          fetchWeatherInfo(data[0].name);
        } catch (error) {
          if (error instanceof DOMException) {
            return;
          }
          console.error(error);
          // alert('Khong lay duoc vi tri!')
          navigate(`/${encodeURI('ho-chi-minh')}`);
        }
      },
      (err) => {
        if (err.PERMISSION_DENIED) {
          // alert('Hãy bật truy cập vị trí');
        }
      }
    );
  }

  useEffect(() => {
    if (city) {
      setCurrentCity(city);
      fetchWeatherInfo(city);
      return;
    }
    const abortController = new AbortController();
    getCurrentCity(abortController);
    return () => {
      abortController.abort();
    };
  }, [city]);

  return (
    <section className="content-wrapper">
      <div className="d-flex flex-column flex-sm-row gap-1 mb-2">
        <Link to="/" className="flex-shrink-0 me-1">
          <img src={logoSrc} alt="Logo" style={{ height: '2em' }} />
        </Link>
        <div style={{ flex: 1 }}>
          {/* stp */}
          <Select
            options={citys}
            value={''}
            // Hàm cập nhật thành phố dựa vào lựa chọn
            onChange={(selectOption) => {
              navigate(`/${encodeURI(selectOption.value)}`);
            }}
            placeholder="Tỉnh/Thành phố"
            styles={darkMode && darkThemeSelect}
          />
        </div>
        <select
          onChange={(e) => {
            changeMode(e.target.value);
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
        <label className="ui-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => toggleDarkMode()}
          />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>
      </div>
      <div className="d-sm-flex justify-content-between">
        <div>
          <i className="bi bi-geo-alt-fill"></i> Vị trí:{' '}
          {citys.find((storedCity) => {
            return storedCity.value == city;
          })?.label || currentCity}
        </div>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="btn text-body bg-body-tertiary border me-1"
        >
          <i className="bi bi-crosshair"></i> Lấy vị trí hiện tại
        </button>
      </div>
    </section>
  );
}

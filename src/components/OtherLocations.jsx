import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getTemperatureString } from '../common/utils.js';
import { ModeContext } from './AppProvider.jsx';
import PropTypes from 'prop-types';
import { domain } from '../common/commonVal.js';

function WeatherOfCity({ city }) {
  const { mode } = useContext(ModeContext);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    fetch(`${domain}/search/${city}`, {
      mode: 'cors',
    })
      .then(async (response) => {
        if (response.status >= 400) {
          const msg = (await response.json()).message;
          throw new Error(msg);
        }
        setWeatherInfo(await response.json());
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(e.message);
      });
  }, [city]);

  if (!weatherInfo) {
    return <div>Loading...</div>;
  }

  const currentConditions = weatherInfo.currentConditions;
  const temperature = currentConditions.temp;
  const humidity = currentConditions.humidity;
  const conditions = currentConditions.conditions;

  return (
    <Link
      to={`/${encodeURI(city)}`}
      className="col"
    >
      <div
        className="h-100 p-2 bg-body-tertiary border rounded-3"
        style={{ textAlign: 'center' }}
      >
        <h5>{weatherInfo.resolvedAddress}</h5>
        <img
          src={`/assets/status/${weatherInfo.currentConditions.icon}.svg`}
          alt=""
          className="m-auto"
          style={{ width: '50%' }}
        />
        <span
          className="card-text d-block"
          style={{ textAlign: 'center' }}
        >
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <i className="fa-solid fa-droplet" />
            <div className="m-0">{humidity}%</div>
          </div>
          <div className=' text-truncate'>{conditions}</div>
          <div>{getTemperatureString(mode, temperature)}</div>
        </span>
      </div>
    </Link>
  );
}

WeatherOfCity.propTypes = {
  city: PropTypes.string,
};

// Các thành phố bạn muốn hiển thị thời tiết
const cities = [
  'ha-noi',
  'quang-ninh',
  'khanh-hoa',
  'da-nang',
  'binh-duong',
  'dong-nai',
  'vinh-long',
  'can-tho',
];

export default function OtherLocations() {
  return (
    <div className="content-wrapper">
      <h3>Thời tiết khu vực khác</h3>
      <div className="container-fluid">
        <div className="row row-cols-2 row-cols-sm-4 g-2">
          {cities.map((city) => (
            <WeatherOfCity
              key={city}
              city={city}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

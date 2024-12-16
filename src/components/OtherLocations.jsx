import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import citys from '../js/citys.js';
import { getTemperatureString } from '../js/utils.js';

function WeatherOfCity({ city, mode }) {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    let cityUrl = encodeURI(city);
    let url = `https://1weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityUrl}?unitGroup=metric&key=W53D3PBB5PC5A9AWEADBJQ8VJ&contentType=json`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert('Khong tim thay thanh pho!');
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherInfo(data);
      })
      .catch((error) => {
        console.error(error.message);
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
        className="card"
        style={{ textAlign: 'center' }}
      >
        <h5 className="card-title">
          {citys.find((storedCity) => {
            return storedCity.value == city;
          })?.label || ''}
        </h5>
        <img
          src={`assets/status/${weatherInfo.currentConditions.icon}.svg`}
          alt=""
          className="m-auto"
        />
        <span
          className="card-text d-block"
          style={{ textAlign: 'center' }}
        >
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <i className="fa-solid fa-droplet" />
            <p className="m-0">{humidity}%</p>
          </div>
          <div>{conditions}</div>
          <div className="my-1">{getTemperatureString(mode, temperature)}</div>
        </span>
      </div>
    </Link>
  );
}

export default function OtherLocations({ mode }) {
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

  return (
    <div className="content-wrapper">
      <h3>Thời tiết khu vực khác</h3>
      <div className="container-fluid">
        <div className="row row-cols-2 row-cols-lg-4 g-3">
          {cities.map((city) => (
            <WeatherOfCity
              key={city}
              city={city}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { format } from 'date-fns';
import { getDistanceString, getTemperatureString } from '../js/utils.js';
import { useEffect, useState } from 'react';

export default function CurrentWeather({ weatherInfo, mode, darkMode}) {
  const [geolocation, setGeolocation] = useState({
    lat: 10.774,
    lon: 106.634,
  });
  async function getCurrentGeolocation() {
    if (!navigator.geolocation) {
      return;
    }
    await navigator.geolocation.getCurrentPosition(async (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setGeolocation({
        lat: latitude,
        lon: longitude,
      });
    });
  }
  useEffect(() => {
    getCurrentGeolocation();
  }, []);

  return (
    <section className="content-wrapper">
      <div className=" d-flex flex-column flex-lg-row1 gap-3">
        <div
          className="bg-body-tertiary mb-3 mb-md-0 p-3 rounded-3"
          style={{ flex: 6 }}
        >
          <b>
            <small>
              Thời tiết hiện tại ngày&nbsp;
              {format(new Date(weatherInfo.days[0].datetime), 'dd/MM')}
            </small>
          </b>
          <div className="d-sm-flex gap-3 align-items-center">
            <div className="flex-shrink-0">
              <div className="d-flex gap-1 align-items-center display-1">
                <img
                  src={`/assets/status/${weatherInfo.currentConditions.icon}.svg`}
                  alt=""
                  style={{ height: '1.8em' }}
                />
                <b>
                  {getTemperatureString(
                    mode,
                    weatherInfo.currentConditions.temp
                  )}
                </b>
              </div>
            </div>
            <div>
              <b>{weatherInfo.currentConditions.conditions}</b>
              <br />
              <small>
                Nhiệt độ cảm nhận được{' '}
                {getTemperatureString(
                  mode,
                  weatherInfo.currentConditions.feelslike
                )}
              </small>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-5 g-0 g-sm-2">
            <div className="col">
              <small className="text-secondary">
                Gió&nbsp;
                <i className=" bi bi-info-circle"></i>
              </small>
              <br />
              {getDistanceString(mode, weatherInfo.currentConditions.windspeed)}
              /giờ
            </div>
            <div className="col">
              <small className="text-secondary">
                Độ ẩm&nbsp;
                <i className=" bi bi-info-circle"></i>
              </small>
              <br />
              {weatherInfo.currentConditions.humidity}%
            </div>
            <div className="col">
              <small className="text-secondary">
                Tầm nhìn&nbsp;
                <i className=" bi bi-info-circle"></i>
              </small>
              <br />
              {getDistanceString(
                mode,
                weatherInfo.currentConditions.visibility
              )}
            </div>
            <div className="col">
              <small className="text-secondary">
                Áp suất&nbsp;
                <i className=" bi bi-info-circle"></i>
              </small>
              <br />
              {weatherInfo.currentConditions.pressure}mb
            </div>
            <div className="col">
              <small className="text-secondary">
                Điểm sương&nbsp;
                <i className=" bi bi-info-circle"></i>
              </small>
              <br />
              {weatherInfo.currentConditions.dew}°
            </div>
          </div>
        </div>
        <div style={{ flex: 4 }}>
          <iframe
            // src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${geolocation.lat}&lon=${geolocation.lon}&zoom=8`}
            src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=11&overlay=wind&product=ecmwf&level=surface&lat=${weatherInfo.latitude}&lon=${weatherInfo.longitude}&detailLat=${weatherInfo.latitude}&detailLon=${weatherInfo.longitude}&marker=true`}
            className="rounded-3"
            style={{
              width: '100%',
              minHeight: '100%',
              height: '300px',
            }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}

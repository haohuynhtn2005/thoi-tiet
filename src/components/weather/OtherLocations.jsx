import {  useContext } from 'react';
import { Link } from 'react-router-dom';
import { getTemperatureString } from '../../common/utils.js';
import { ModeContext } from '../../providers/AppProvider.jsx';
import PropTypes from 'prop-types';
import useNearbyLocations from '../../hooks/useNeabyLocations.js';

function WeatherOfCity({ locationCode, weatherInfo }) {
  const { mode } = useContext(ModeContext);

  if (!weatherInfo) {
    return <div>Loading...</div>;
  }

  const currentConditions = weatherInfo.currentConditions;
  const temperature = currentConditions.temp;
  const humidity = currentConditions.humidity;
  const conditions = currentConditions.conditions;

  return (
    <Link
      to={`/chi-tiet/${encodeURI(locationCode)}`}
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
          <div className=" text-truncate">{conditions}</div>
          <div>{getTemperatureString(mode, temperature)}</div>
        </span>
      </div>
    </Link>
  );
}

WeatherOfCity.propTypes = {
  locationCode: PropTypes.string,
  weatherInfo: PropTypes.object,
};

export default function OtherLocations() {
  const nearbyLocations = useNearbyLocations();

  return (
    <div>
      <h3>Thời tiết khu vực lân cận</h3>
      <div className="container-fluid">
        <div className="row row-cols-2 row-cols-sm-4 g-2 g-lg-3">
          {nearbyLocations.map((location) => (
            <WeatherOfCity
              key={location.code}
              locationCode={location.code}
              weatherInfo={location.weatherInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

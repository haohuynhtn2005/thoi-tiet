import styles from '../../styles/layout.module.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import ErrorPage from '../../pages/ErrorPage.jsx';
import { getTemperatureString } from '../../common/utils.js';
import { useContext } from 'react';
import { DarkModeContext, ModeContext } from '../../providers/AppProvider.jsx';
import useRandomLocations from '../../hooks/useRandomLocations.js';
import PropTypes from 'prop-types';
import RecentNews from './RecentNews.jsx';

function LoadingLocation() {
  return (
    <div
      className="container-fluid"
      style={{ minHeight: '100%' }}
    >
      <div className="placeholder-glow mb-1">
        <span
          className="placeholder col-12"
          style={{ height: '2em' }}
        />
      </div>
      <div className="placeholder-glow mb-1">
        <span className="placeholder col-3" />
      </div>
      <div className="placeholder-glow mb-1">
        <span className="placeholder col-7" />
      </div>
      <div className=" row row-cols-2 row-cols-sm-4 g-2 g-lg-3 mb-1">
        {(() => {
          const arr = [];
          for (let i = 0; i < 12; i++) {
            arr.push(
              <div
                key={i}
                className="placeholder-glow col"
              >
                <div
                  className="placeholder col-12"
                  style={{ height: '12em' }}
                />
              </div>
            );
          }
          return arr;
        })()}
      </div>
    </div>
  );
}

function Location({ location }) {
  const { mode } = useContext(ModeContext);

  const weatherInfo = location.weatherInfo;
  const currentConditions = weatherInfo.currentConditions;
  const temperature = currentConditions.temp;
  const humidity = currentConditions.humidity;
  const conditions = currentConditions.conditions;

  return (
    <Link
      to={`/chi-tiet/${encodeURI(location.code)}`}
      className="col"
    >
      <div
        className="h-100 p-2 bg-body-tertiary border rounded-3"
        style={{ textAlign: 'center' }}
      >
        <h5>{weatherInfo.resolvedAddress}</h5>
        <img
          src={`assets/status/${weatherInfo.currentConditions.icon}.svg`}
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

Location.propTypes = {
  location: PropTypes.object,
};

function LocationListContent() {
  const { status, result } = useRandomLocations();
  if (status == 'loading') {
    return <LoadingLocation />;
  }

  if (status == 'error') {
    console.warn(result);
    return <ErrorPage message={result.message} />;
  }

  return (
    <div className="container-fluid">
      <div className="row row-cols-2 row-cols-sm-4 g-2">
        {result.map((location) => {
          return (
            <Location
              key={location.code}
              location={location}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function LocationList() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={styles.mainLayout}
      style={{
        backgroundImage: `url(/assets/background/${
          darkMode ? 'bg-dark' : 'bg-light'
        }.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <div className="p-2">
        <Header />
        <LocationListContent />
      </div>
      <div className="p-2">
        <RecentNews />
      </div>
    </div>
  );
}

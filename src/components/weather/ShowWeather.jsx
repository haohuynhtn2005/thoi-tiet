import styles from '../../styles/layout.module.css';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Details from './Details';
import WeatherChart from './WeatherChart';
import OtherLocations from './OtherLocations';
import useWeatherInfo from '../../hooks/useWeatherInfo.js';
import ErrorPage from '../../pages/ErrorPage.jsx';
import { WeatherInfoContext } from '../../App.jsx';
import RecentNews from './RecentNews.jsx';
import { DarkModeContext } from '../../providers/AppProvider.jsx';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import IllustrateWeather from './IllustrateWeather.jsx';

function LoadingShowWeather() {
  return (
    <div
      className="content-wrapper"
      style={{ minHeight: '100vh' }}
    >
      <div className="placeholder-glow mb-1">
        <span className="placeholder col-4" />
      </div>
      <div className="placeholder-glow mb-1">
        <span
          className="placeholder col-4"
          style={{ height: '8em' }}
        />
      </div>
      <div className="placeholder-glow mb-1">
        <span className="placeholder col-7" />
        <span className="placeholder col-4" />
        <span className="placeholder col-4" />
        <span className="placeholder col-6" />
        <span className="placeholder col-8" />
        <span className="placeholder col-9" />
        <span className="placeholder col-11" />
        <span className="placeholder col-3" />
        <span className="placeholder col-6" />
        <span className="placeholder col-8" />
      </div>
      <div className="placeholder-glow mb-1">
        <span
          className="placeholder col-12"
          style={{ height: '500px' }}
        />
      </div>
    </div>
  );
}

function ShowWeatherContent({ status, result }) {
  if (status == 'loading') {
    return <LoadingShowWeather />;
  }

  if (status == 'error') {
    return <ErrorPage message={result.message} />;
  }

  return (
    <>
      <Header />
      <CurrentWeather />
      <Forecast />
      <Details />
      <WeatherChart />
      <IllustrateWeather />
      <OtherLocations />
    </>
  );
}

ShowWeatherContent.propTypes = {
  status: PropTypes.string,
  result: PropTypes.object,
};

export default function ShowWeather() {
  const { status, result } = useWeatherInfo();

  const { darkMode } = useContext(DarkModeContext);
  return (
    <WeatherInfoContext.Provider value={{ weatherInfo: result }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-fixed top-0 start-0 w-100 h-100 object-fit-cover"
        style={{ zIndex: -1 }}
      >
        <source
          src={'/assets/video/fog1.mp4'}
          type="video/mp4"
        />
      </video>
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
          <ShowWeatherContent
            status={status}
            result={result}
          />
        </div>
        <div className="p-2">
          <RecentNews />
        </div>
      </div>
    </WeatherInfoContext.Provider>
  );
}

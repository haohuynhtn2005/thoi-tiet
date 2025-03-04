import Header from './Header';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Details from './Details';
import WeatherChart from './WeatherChart';
import OtherLocations from './OtherLocations';
import useWeatherInfo from '../../hooks/useWeatherInfo.js';
import ErrorPage from '../../pages/ErrorPage.jsx';
import { WeatherInfoContext } from '../../App.jsx';

function LoadingShowWeather() {
  return (
    <div
      className="bg-body-tertiary content-wrapper"
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

export default function ShowWeather() {
  const { status, result } = useWeatherInfo();

  if (status == 'loading') {
    return <LoadingShowWeather />;
  }

  if (status == 'error') {
    return <ErrorPage message={result.message} />;
  }

  console.warn(status);

  return (
    <WeatherInfoContext.Provider value={{ weatherInfo: result }}>
      <div className="p-2">
        <Header />
        <CurrentWeather />
        <Forecast />
        <Details />
        <WeatherChart />
        <OtherLocations />
      </div>
    </WeatherInfoContext.Provider>
  );
}

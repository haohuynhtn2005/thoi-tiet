import './App.css';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast.jsx';
import WeatherChart from './components/WeatherChart';
import OtherLocations from './components/OtherLocations.jsx';
import {
  WeatherInfoContext,
} from './components/AppProvider.jsx';
import useWeatherInfo from './hooks/useWeatherInfo.js';
import Wrapper from './components/Wrapper.jsx';

Chart.register(CategoryScale);

function LoadingApp() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

function App() {
  const { loading, error, weatherInfo } = useWeatherInfo();
  if (loading) {
    return <LoadingApp />;
  }

  if (error) {
    console.warn(error);
    return (
      <Wrapper>
        <div
          className="d-flex align-items-center justify-content-center fs-3 text-danger"
          style={{ minHeight: '100vh' }}
        >
          <div>
            <i className="bi bi-exclamation-octagon"></i> {error.message}
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <WeatherInfoContext.Provider value={{ weatherInfo }}>
      <Wrapper>
        <Header />
        <CurrentWeather />
        <Forecast />
        <WeatherChart />
        <OtherLocations />
      </Wrapper>
    </WeatherInfoContext.Provider>
  );
}

export default App;

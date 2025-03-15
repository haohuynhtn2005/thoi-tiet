import './App.css';
import styles from './styles/layout.module.css';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import Wrapper from './components/Wrapper.jsx';
import Navbar from './components/Navbar.jsx';
import useLocationOpts from './hooks/useLocationOpts.js';
import AdPopup from './components/weather/AdPopup.jsx';

Chart.register(CategoryScale);
const LocationOptsContext = createContext(null);
const WeatherInfoContext = createContext(null);

function App() {
  const locationOpts = useLocationOpts();

  return (
    <div>
      {/* <AdPopup /> */}

      <WeatherInfoContext.Provider value={{}}>
        <LocationOptsContext.Provider value={{ locationOpts }}>
          <div
            className="d-grid"
            style={{ height: '100vh', gridTemplateRows: 'auto 1fr' }}
          >
            <div>
              <Navbar />
            </div>
            <div className="overflow-auto">
              <Outlet />
            </div>
          </div>
        </LocationOptsContext.Provider>
      </WeatherInfoContext.Provider>
    </div>
  );
}

export default App;
export { LocationOptsContext, WeatherInfoContext };

import './App.css';
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
    <Wrapper>
      <AdPopup />

      <Navbar />
      <WeatherInfoContext.Provider value={{}}>
        <LocationOptsContext.Provider value={{ locationOpts }}>
          <Outlet />
        </LocationOptsContext.Provider>
      </WeatherInfoContext.Provider>
    </Wrapper>
  );
}

export default App;
export { LocationOptsContext, WeatherInfoContext };

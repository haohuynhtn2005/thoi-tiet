import './App.css';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import Wrapper from './components/Wrapper.jsx';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { createContext } from 'react';
import useLocationOpts from './hooks/useLocationOpts.js';

Chart.register(CategoryScale);

const LocationOptsContext = createContext(null);
const WeatherInfoContext = createContext(null);

function App() {
  const locationOpts = useLocationOpts();

  return (
    <Wrapper
      style={{
        backgroundImage: 'url(/assets/background/overlay.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
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

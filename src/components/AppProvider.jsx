import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useDarkMode from '../hooks/useDarkMode';
import useLocationOpts from '../hooks/useLocationOpts';

const WeatherInfoContext = createContext(null);
const ModeContext = createContext(null);
const DarkModeContext = createContext(null);
const LocationOpts = createContext(null);

function AppProvider({ children }) {
  const [mode, setMode] = useState('metric');
  const [weatherInfo] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();
  const locationOpts = useLocationOpts();

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <WeatherInfoContext.Provider value={{ weatherInfo }}>
          <LocationOpts.Provider value={{ locationOpts }}>
            {children}
          </LocationOpts.Provider>
        </WeatherInfoContext.Provider>
      </DarkModeContext.Provider>
    </ModeContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
export { WeatherInfoContext, ModeContext, DarkModeContext, LocationOpts };

import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useDarkMode from '../hooks/useDarkMode';

const WeatherInfoContext = createContext(null);
const ModeContext = createContext(null);
const DarkModeContext = createContext(null);

function AppProvider({ children }) {
  const [mode, setMode] = useState('metric');
  const [weatherInfo] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <WeatherInfoContext.Provider value={{ weatherInfo }}>
          {children}
        </WeatherInfoContext.Provider>
      </DarkModeContext.Provider>
    </ModeContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
export { WeatherInfoContext, ModeContext, DarkModeContext };

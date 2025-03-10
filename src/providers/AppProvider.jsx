import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useDarkMode from '../hooks/useDarkMode';
import useUser from '../hooks/useUser';

const ModeContext = createContext(null);
const DarkModeContext = createContext(null);
const UserContext = createContext(null);

function AppProvider({ children }) {
  const [mode, setMode] = useState('metric');
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, fetchUser } = useUser();

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <UserContext.Provider value={{ user, fetchUser }}>
          {children}
        </UserContext.Provider>
      </DarkModeContext.Provider>
    </ModeContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
export { ModeContext, DarkModeContext, UserContext };

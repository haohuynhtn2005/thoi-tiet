import { useContext } from 'react';
import { DarkModeContext } from '../../providers/AppProvider';

export default function DarkSwitch() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      <label className="ui-switch">
        <input
          type="checkbox"
          name="darkMode"
          checked={darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
          }}
        />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
}

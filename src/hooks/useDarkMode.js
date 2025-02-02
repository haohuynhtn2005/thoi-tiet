import { useState } from 'react';

const initialDarkModeVal = localStorage.getItem('darkMode') == 'true';

function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(initialDarkModeVal);

  function setDarkMode(darkModeValue = true) {
    setDarkModeState(darkModeValue);
    localStorage.setItem('darkMode', String(darkModeValue));
  }

  return [darkMode, setDarkMode];
}

export default useDarkMode;

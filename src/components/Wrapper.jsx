import { useContext } from 'react';
import PropTypes from 'prop-types';
import { DarkModeContext } from './AppProvider';

export default function Wrapper({ children, style }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <section
      data-bs-theme={darkMode ? 'dark' : 'light'}
      className="text-body bg-body"
      style={style}
    >
      {children}
    </section>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

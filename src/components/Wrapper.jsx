import { useContext } from 'react';
import PropTypes from 'prop-types';
import { DarkModeContext } from '../providers/AppProvider';

export default function Wrapper({ children, style, ...props }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <section
      {...props}
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

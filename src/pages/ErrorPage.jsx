import PropTypes from 'prop-types';
import Wrapper from '../components/Wrapper';

export default function ErrorPage({ message }) {
  return (
    <Wrapper>
      <div
        className="d-flex align-items-center justify-content-center fs-3 text-danger"
        style={{ minHeight: '100vh' }}
      >
        <div>
          <i className="bi bi-exclamation-octagon"></i> {message}
        </div>
      </div>
    </Wrapper>
  );
}

ErrorPage.propTypes = {
  message: PropTypes.string,
};

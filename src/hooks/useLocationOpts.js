import { useEffect, useState } from 'react';
import { domain } from '../common/commonVal';

function useLocationOpts() {
  const [locationOpts, setLocationOpts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${domain}/getLocationOpts`, {
      mode: 'cors',
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setLocationOpts(response))
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(e);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return locationOpts;
}

export default useLocationOpts;

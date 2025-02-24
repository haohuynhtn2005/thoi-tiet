import { useEffect, useState } from 'react';
import { domain } from '../common/commonVal';

function useRandomLocations() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const result = { locations, error, loading };

  useEffect(() => {
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    fetch(`${domain}/getRandomLocations`, {
      signal: abortController.signal,
      mode: 'cors',
    })
      .then(async (response) => {
        if (response.status >= 400) {
          const msg = (await response.json()).message;
          throw new Error(msg);
        }
        setLocations(await response.json());
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        setError(e);
      })

    return () => {
      abortController.abort();
    };
  }, []);

  return result;
}

export default useRandomLocations;

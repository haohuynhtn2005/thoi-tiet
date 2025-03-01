import { useEffect, useState } from 'react';
import { domain } from '../common/commonVal';

function useRandomLocations() {
  const [fetching, setFetching] = useState({
    status: 'loading',
    result: null,
  });

  useEffect(() => {
    setFetching((old) => {
      return {
        ...old,
        status: 'loading',
      };
    });
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
        setFetching({
          status: 'loaded',
          result: await response.json(),
        });
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        setFetching({
          result: e,
          status: 'error',
        });
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return fetching;
}

export default useRandomLocations;

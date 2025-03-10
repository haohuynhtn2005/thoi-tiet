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
      .then(async (res) => {
        if (!res.ok) {
          const msg = (await res.json()).message;
          throw new Error(msg);
        }
        setFetching({
          status: 'loaded',
          result: await res.json(),
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

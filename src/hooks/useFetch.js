import { useEffect, useRef, useState } from 'react';

export default function useFetch(url = '', defaultResult = null, options = {}) {
  const [toggleFetch, setToggleFetch] = useState(false);
  const optionsRef = useRef(options);
  const defaultResultRef = useRef(defaultResult);

  const [fetching, setFetching] = useState({
    loading: true,
    error: null,
    result: defaultResult,
  });

  const setResult = (res) => {
    setFetching({
      ...fetching,
      result: res,
    });
  };

  const reFetch = () => {
    setToggleFetch((prev) => !prev);
  };

  useEffect(() => {
    setFetching({
      loading: true,
      error: null,
      result: defaultResultRef.current,
    });
    const abortController = new AbortController();
    fetch(url, {
      signal: abortController.signal,
      mode: 'cors',
      credentials: 'include',
      ...optionsRef.current,
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = (await res.json()).message;
          throw new Error(msg);
        }
        setFetching({
          loading: false,
          error: null,
          result: await res.json(),
        });
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        setFetching({
          loading: false,
          error: e,
          result: defaultResultRef.current,
        });
      });

    return () => {
      abortController.abort();
    };
  }, [url, toggleFetch]);

  return {
    ...fetching,
    setResult,
    reFetch,
  };
}

import { useCallback, useEffect, useState } from 'react';
import { domain } from '../common/commonVal';
import ResponseErr from '../errors/ResponseErr';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [startFetchUser, setStartFetchUser] = useState(false);

  const fetchUser = useCallback(() => {
    setStartFetchUser((old) => !old);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${domain}/getUser`, {
          signal: abortController.signal,
          credentials: 'include',
        });
        if (!res.ok) {
          const message = (await res.json()).message;
          throw new ResponseErr(message, res.status);
        }
        const data = await res.json();
        setUser(data);
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        if (e.name != 'ResponseErr') {
          console.error('Loi lay nguoi dung', e.name);
        }
        setUser(null);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [startFetchUser]);

  return { user, fetchUser };
}

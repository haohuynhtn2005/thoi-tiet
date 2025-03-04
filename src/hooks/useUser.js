import { useCallback, useEffect, useState } from 'react';
import { domain } from '../common/commonVal';
import { useNavigate } from 'react-router-dom';

export default function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [startFetch, setStartFetch] = useState(true);

  const fetchUser = useCallback(() => {
    setStartFetch((old) => !old);
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
          throw new Error(message);
        }
        const data = await res.json();
        setUser(data);
        navigate('/');
      } catch (e) {
        if (e.name === 'AbortError') {
          return;
        }
        setUser(null);
        console.error('Loi lay nguoi dung', e);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [navigate, startFetch]);

  return { user, fetchUser };
}

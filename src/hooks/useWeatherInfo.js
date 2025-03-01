import { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../components/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { domain } from '../common/commonVal';

const fallbackNavigate = '/chi-tiet/tp-ho-chi-minh';

function useWeatherInfo() {
  const navigate = useNavigate();
  const { locationCode } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const darkModeRef = useRef(darkMode);
  const [fetching, setFetching] = useState({
    status: 'loading',
    result: null,
  });

  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    setFetching((old) => {
      return {
        ...old,
        status: 'loading',
      };
    });
    const abortController = new AbortController();
    if (locationCode) {
      fetch(`${domain}/search/${locationCode}`, {
        signal: abortController.signal,
        mode: 'cors',
      })
        .then(async (response) => {
          if (!response.ok) {
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
            status: 'error',
            result: e,
          });
        });
      return;
    }

    if (!navigator.geolocation) {
      const msg = 'Trình duyệt không hỗ trợ tìm vị trí';
      Swal.fire({
        icon: 'question',
        title: 'Vị trí?',
        text: msg,
        confirmButtonColor: '#0d6efd',
        theme: darkModeRef.current && 'dark',
        willClose: () => {
          navigate(fallbackNavigate);
        },
      });
    }

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`${domain}/reversegeo/`, {
          signal: abortController.signal,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({ lat, lon }),
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
              status: 'error',
              result: e,
            });
          });
      },
      () => {
        Swal.fire({
          icon: 'warning',
          title: 'Chưa cho phép truy cập vị trí',
          text: 'Xem thời tiết nơi khác?',
          confirmButtonColor: '#0d6efd',
          theme: darkModeRef.current && 'dark',
          willClose: () => {
            navigate(fallbackNavigate);
          },
        });
      }
    );

    return () => {
      abortController.abort();
    };
  }, [locationCode, navigate]);

  return fetching;
}

export default useWeatherInfo;

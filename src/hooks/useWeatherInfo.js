import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../components/AppProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { domain } from '../common/commonVal';

const fallbackNavigate = '/chi-tiet/tp-ho-chi-minh';

function useWeatherInfo() {
  const navigate = useNavigate();
  const { locationCode } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const result = { weatherInfo, error, loading };

  useEffect(() => {
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    if (locationCode) {
      fetch(`${domain}/search/${locationCode}`, {
        signal: abortController.signal,
        mode: 'cors',
      })
        .then(async (response) => {
          if (response.status >= 400) {
            const msg = (await response.json()).message;
            throw new Error(msg);
          }
          setWeatherInfo(await response.json());
          setLoading(false);
        })
        .catch((e) => {
          if (e.name === 'AbortError') {
            return;
          }
          setError(e);
        });
      return;
    }

    if (!navigator.geolocation) {
      const msg = 'Trình duyệt không hỗ trợ tìm vị trí';
      Swal.fire({
        title: 'Vị trí?',
        text: msg,
        icon: 'question',
        theme: darkMode && 'dark',
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
          body: JSON.stringify({
            lat,
            lon,
          }),
        })
          .then(async (response) => {
            if (response.status >= 400) {
              const msg = (await response.json()).message;
              throw new Error(msg);
            }
            setWeatherInfo(await response.json());
            setLoading(false);
          })
          .catch((e) => {
            if (e.name === 'AbortError') {
              return;
            }
            setError(e);
          });
      },
      () => {
        Swal.fire({
          title: 'Chưa cho phép truy cập vị trí',
          text: 'Xem thời tiết nơi khác?',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0d6efd',
          reverseButtons: true,
          icon: 'warning',
          theme: darkMode && 'dark',
          willClose: () => {
            navigate(fallbackNavigate);
          },
        });
      }
    );

    return () => {
      abortController.abort();
    };
  }, [locationCode]);

  return result;
}

export default useWeatherInfo;

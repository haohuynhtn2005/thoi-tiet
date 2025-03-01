import { useContext, useEffect, useState } from 'react';
import { domain } from '../common/commonVal';
import { WeatherInfoContext } from '../components/AppProvider';

function useNearbyLocations() {
  const { weatherInfo } = useContext(WeatherInfoContext);
  const { latitude: lat, longitude: lon } = weatherInfo;
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${domain}/nearbyLocations`, {
      signal: abortController.signal,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ lat, lon }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error((await response.json).message);
        }
        return response.json();
      })
      .then((response) => setNearbyLocations(response))
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(e);
      });
    return () => {
      abortController.abort();
    };
  }, [lat, lon]);

  return nearbyLocations;
}

export default useNearbyLocations;

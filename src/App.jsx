import { useState } from 'react';
import './App.css';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import WeatherChart from './components/WeatherChart';
import OtherLocations from './components/OtherLocations.jsx';
import { temp } from './js/temp.js';

Chart.register(CategoryScale);

function App() {
  const [mode, setMode] = useState('metric');
  const [weatherInfo, setWeatherInfo] = useState(temp);

  async function fetchWeatherInfo(city = '') {
    let cityUrl = encodeURI(city);
    try {
      let url = `https://1weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityUrl}%2C%20viet%20nam?unitGroup=metric&key=W53D3PBB5PC5A9AWEADBJQ8VJ&contentType=json`;
      const response = await fetch(url);
      if (!response.ok) {
        alert('Khong tim thay thanh pho!');
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      setWeatherInfo(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <section>
      <Header
        fetchWeatherInfo={fetchWeatherInfo}
        changeMode={setMode}
      />
      <CurrentWeather
        weatherInfo={weatherInfo}
        mode={mode}
      />
      <WeatherForecast
        weatherInfo={weatherInfo}
        mode={mode}
      />
      <WeatherChart
        weatherInfo={weatherInfo}
        mode={mode}
      />
      <OtherLocations mode={mode} />
    </section>
  );
}

export default App;

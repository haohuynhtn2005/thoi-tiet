import { Line } from 'react-chartjs-2';
import { getTemperature } from '../../common/utils.js';
import { ModeContext } from '../../providers/AppProvider.jsx';
import { WeatherInfoContext } from '../../App.jsx';
import { useContext } from 'react';

const labels = [
  '00:00',
  '02:00',
  '04:00',
  '06:00',
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

export default function WeatherChart() {
  const { mode } = useContext(ModeContext);
  const { weatherInfo } = useContext(WeatherInfoContext);

  const tempData = (() => {
    const arr = [];
    for (let i = 0; i < weatherInfo.days[0].hours.length; i += 2) {
      const hour = weatherInfo.days[0].hours[i];
      arr.push(getTemperature(mode, hour.temp));
    }
    return arr;
  })();

  const humidityData = (() => {
    const arr = [];
    for (let i = 0; i < weatherInfo.days[0].hours.length; i += 2) {
      const hour = weatherInfo.days[0].hours[i];
      arr.push(hour.humidity);
    }
    return arr;
  })();

  return (
    <section>
      <h3>Biểu đồ nhiệt độ</h3>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: `Nhiệt độ ${mode == 'us' ? '°F' : '°C'}`,
              data: tempData,
              borderWidth: 1,
              borderColor: '#FF6384',
              backgroundColor: '#FF638480',
              fill: 'start',
              tension: 0.5,
            },
          ],
        }}
        options={{
          plugins: {
            filler: {
              propagate: false,
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            y: {
              suggestedMin: Math.min(...tempData) - 1,
              suggestedMax: Math.max(...tempData) + 1,
            },
          },
        }}
      />
      <h3 className="my-3">Biểu đồ độ ẩm</h3>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Độ ẩm %',
              data: humidityData,
              borderWidth: 1,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 8,
              borderColor: '#36A2EB',
              backgroundColor: '#36A2EB80',
              fill: 'start',
            },
          ],
        }}
        options={{
          plugins: {
            filler: {
              propagate: false,
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            y: {
              suggestedMin: Math.min(...humidityData) - 1,
              suggestedMax: Math.max(...humidityData) + 1,
            },
          },
        }}
      />
    </section>
  );
}

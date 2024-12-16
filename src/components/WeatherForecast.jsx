import { format } from 'date-fns';
import { getTemperatureString } from '../js/utils.js';

function ForecastItem({ date, icon, max, min }) {
  return (
    <div className="col p-2">
      <div className="card">
        <p className="card-title text-center">{date}</p>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img
            src={`/assets/status/${icon}.svg`}
            alt=""
            style={{ width: '50%' }}
            className="card-img"
          />
          <div className="Temparature">
            <h5 className="highest fw-bold">{max}</h5>
            <h5 className="lowest">{min}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherForecast({ weatherInfo, mode }) {
  return (
    <section className="content-wrapper">
      <h3>Dự báo</h3>
      <div className="container">
        <div className="row row-cols-lg-6 row-cols-md-3 row-cols-2">
          {(() => {
            const arr = [];
            for (let i = 1; i < 7; i += 1) {
              const day = weatherInfo.days[i];
              arr.push(
                <ForecastItem
                  key={i}
                  date={`Ng ${format(new Date(day.datetime), 'dd/MM')}`}
                  icon={day.icon}
                  max={getTemperatureString(mode, day.tempmax)}
                  min={getTemperatureString(mode, day.tempmin)}
                />
              );
            }
            return arr;
          })()}
        </div>
      </div>
    </section>
  );
}

import { format } from 'date-fns';
import { ModeContext } from '../../providers/AppProvider.jsx';
import { WeatherInfoContext } from '../../App.jsx';
import { getTemperatureString } from '../../common/utils.js';
import PropTypes from 'prop-types';
import { useContext } from 'react';

function ForecastItem({ date, icon, max, min }) {
  const { mode } = useContext(ModeContext);
  return (
    <div className="col">
      <div className="bg-body-tertiary border rounded-3 p-2">
        <div className="text-center">{date}</div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img
            src={`/assets/status/${icon}.svg`}
            alt=""
            style={{ width: '50%' }}
          />
          <div className="fs-5">
            <div className="highest fw-bold">
              {getTemperatureString(mode, max)}
            </div>
            <div className="lowest">{getTemperatureString(mode, min)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ForecastItem.propTypes = {
  date: PropTypes.string,
  icon: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default function Forecast() {
  const { weatherInfo } = useContext(WeatherInfoContext);

  return (
    <section>
      <h3>Dự báo</h3>
      <div className="container-fluid">
        <div className="row row-cols-sm-4 row-cols-2 g-2">
          {(() => {
            const arr = [];
            for (let i = 1; i < 9; i += 1) {
              const day = weatherInfo.days[i];
              arr.push(
                <ForecastItem
                  key={i}
                  date={`Ng ${format(new Date(day.datetime), 'dd/MM')}`}
                  icon={day.icon}
                  max={day.tempmax}
                  min={day.tempmin}
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

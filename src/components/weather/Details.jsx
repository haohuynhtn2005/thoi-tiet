import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getTemperatureString } from '../../common/utils.js';
import { ModeContext } from '../../providers/AppProvider.jsx';
import PropTypes from 'prop-types';
import { domain } from '../../common/commonVal.js';

function WeatherOfCity({ city }) {
  const { mode } = useContext(ModeContext);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    fetch(`${domain}/search/${city}`, {
      mode: 'cors',
    })
      .then(async (response) => {
        if (response.status >= 400) {
          const msg = (await response.json()).message;
          throw new Error(msg);
        }
        setWeatherInfo(await response.json());
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          return;
        }
        console.error(e.message);
      });
  }, [city]);

  if (!weatherInfo) {
    return <div>Loading...</div>;
  }

  const currentConditions = weatherInfo.currentConditions;
  const temperature = currentConditions.temp;
  const humidity = currentConditions.humidity;
  const conditions = currentConditions.conditions;

  return (
    <Link
      to={`/${encodeURI(city)}`}
      className="col"
    >
      <div
        className="h-100 p-2 bg-body-tertiary border rounded-3"
        style={{ textAlign: 'center' }}
      >
        <h5>{weatherInfo.resolvedAddress}</h5>
        <img
          src={`/assets/status/${weatherInfo.currentConditions.icon}.svg`}
          alt=""
          className="m-auto"
          style={{ width: '50%' }}
        />
        <span
          className="card-text d-block"
          style={{ textAlign: 'center' }}
        >
          <div className="d-flex justify-content-center gap-2 align-items-center">
            <i className="fa-solid fa-droplet" />
            <div className="m-0">{humidity}%</div>
          </div>
          <div className=" text-truncate">{conditions}</div>
          <div>{getTemperatureString(mode, temperature)}</div>
        </span>
      </div>
    </Link>
  );
}

WeatherOfCity.propTypes = {
  city: PropTypes.string,
};

export default function Details() {
  return (
    <div className="content-wrapper">
      <h3>Chi tiết</h3>
      <div className="container-fluid">
        <div className="row row-cols-2 row-cols-sm-4 g-2 g-lg-3">
          <div className="col">
            <div>
              Nhiệt độ
              <svg
                width={244}
                height={115}
                viewBox="0 0 244 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    y2="0%"
                    x2="0%"
                    y1="100%"
                    x1="0%"
                    id="weatherDetailsOpacityGradient"
                  >
                    <stop
                      stopColor="#c4c4c4"
                      offset="25%"
                      stopOpacity="0.1"
                    />
                    <stop
                      stopColor="#c4c4c4"
                      offset="93.56%"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <mask id="weatherDetailsOpacityMask">
                    <rect
                      fill="url(#weatherDetailsOpacityGradient)"
                      x={0}
                      y={0}
                      width={244}
                      height={115}
                    />
                  </mask>
                </defs>
                <defs>
                  <linearGradient
                    id="TemperatureCardGradient"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                  >
                    <stop
                      offset={0}
                      stopColor="#CC2635"
                    />
                    <stop
                      offset="86.25%"
                      stopColor="#CC2635"
                    />
                    <stop
                      offset="86.25%"
                      className="tempLineBackground-DS-EntryPoint1-1"
                    />
                  </linearGradient>
                </defs>
                <defs>
                  <path
                    id="tempTrendArea"
                    d="M0,68.99539953995398C21.313690476190473,65.26680197781681,42.627380952380946,61.538204415679644,61,57.499999999999986C79.37261904761905,53.46179558432033,94.80416666666665,49.11398431509816,122,45.99884988498848C149.19583333333335,42.8837154548788,188.1559523809524,41.00125786388161,210.45000000000002,40.24827482748274C232.74404761904762,39.495291791083865,238.3720238095238,39.8717833092833,244,40.24827482748274L244,115C238.37202380952385,115,232.74404761904762,115,210.45000000000002,115C188.1559523809524,115,149.19583333333333,115.00000000000001,122,115C94.80416666666667,114.99999999999999,79.37261904761905,115,61,115C42.627380952380946,115,21.313690476190473,115,0,115Z"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </defs>
                <defs>
                  <g id="tempTrendPath">
                    <path
                      d="M4,64.19571957195718C24.61488095238095,60.72650270979478,45.2297619047619,57.25728584763236,63,53.499999999999986C80.7702380952381,49.74271415236761,95.69583333333333,45.69735931926525,122,42.798929892989285C148.30416666666667,39.90050046671332,185.98690476190475,38.148996447263755,207.55,37.44839483948394C229.11309523809527,36.74779323170412,234.55654761904765,37.09809403559403,240,37.44839483948394"
                      stroke="url('#TemperatureCardGradient')"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      stroke="#fff"
                      strokeWidth={3}
                      fill="#CC2635"
                      cx="207.55"
                      cy="37.44839483948394"
                      r={10}
                    />
                  </g>
                </defs>
                <use
                  x={0}
                  y={0}
                  width={244}
                  height={115}
                  href="#tempTrendArea"
                  stroke="#CC2635"
                  style={{
                    fill: 'rgb(204, 38, 53)',
                    mask: 'url("#weatherDetailsOpacityMask")',
                    stroke: 'none',
                    boxShadow: 'rgb(255, 255, 255) 0px 2px 0px inset',
                  }}
                />
                <use
                  x={0}
                  y={0}
                  width={244}
                  height={115}
                  href="#tempTrendPath"
                  style={{ boxShadow: 'rgb(255, 255, 255) 0px 2px 0px inset' }}
                />
                <g className="temperatureVal-DS-EntryPoint1-1">
                  <text
                    x="207.55"
                    y={103}
                  >
                    30°
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

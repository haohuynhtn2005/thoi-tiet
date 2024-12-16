function getTemperature(mode, degree) {
  if (mode == 'us') {
    return (9 / 5) * degree + 32;
  }
  return degree;
}

function getTemperatureString(mode, degree) {
  if (mode == 'us') {
    return `${((9 / 5) * degree + 32).toFixed(0)}°F`;
  }
  return `${(degree).toFixed(0)}°C`;
}

function getDistanceString(mode, distance) {
  if (mode == 'metric') {
    return `${(distance).toFixed(1)}km`;
  }
  return `${(0.621371 * distance).toFixed(1)}mi`;
}

export { getTemperature, getTemperatureString, getDistanceString };

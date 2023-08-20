import Image from 'next/image';

const MetricsBox = ({ weatherData, isMetric, setIsMetric, sunrise, sunset, isDarkMode, setIsDarkMode }) => {
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };
  const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round((degree % 360) / 45);
    return directions[index];
  };

  const metersPerSecondToMilesPerHour = (metersPerSecond) => {
    const milesPerHour = metersPerSecond * 2.23694;
    return milesPerHour.toFixed(2);
  };
  const milesPerHourToMetersPerSecond = (milesPerHour) => {
    const metersPerSecond = milesPerHour / 2.23694;
    return metersPerSecond.toFixed(2);
  };

  const bgColorClass = isDarkMode ? 'bg-dark' : 'bg-light';
  const windSpeedMilesPerHour = metersPerSecondToMilesPerHour(weatherData.wind.speed);
  const windSpeedMetersPerSecond = milesPerHourToMetersPerSecond(windSpeedMilesPerHour);
  return (
    <div>
      <div className='row ms-4'>
        <div className={`col-4 rounded-4 clearfix ${bgColorClass}`} style={{ height: '6em', width: '44%', overflow: "hidden" }}>
     <h6 className='text-nowrap pt-2'>Wind speed
     <img src='/wind.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}> {isMetric ? `${windSpeedMetersPerSecond} m/s` : `${windSpeedMilesPerHour} m/h`}</h4></b>
     </h6>
        </div>
        <div className={`col-4 rounded-4 ms-3 ${bgColorClass}`} style={{ height: '6em', width: '44%' }}>
        <h6 className='text-nowrap pt-2'>Wind direction
     <img src='/compass.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}>{getWindDirection(weatherData.wind.deg)}</h4></b>
     </h6>
        </div>
      </div>
      <div className='row ms-4 pt-2'>
        <div className={`col-4 rounded-4 ${bgColorClass}`} style={{ height: '6em', width: '44%' }}>
        <h6 className='text-nowrap pt-2'>Humidity
     <img src='/humidity.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}>{weatherData.main.humidity} %</h4></b>
     </h6>
        </div>
        <div className={`col-4 rounded-4 ms-3 ${bgColorClass}`} style={{ height: '6em', width: '44%' }}>
        <h6 className='text-nowrap pt-2'>Visibility
     <img src='/binoculars.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}>{weatherData.visibility} km</h4></b>
     </h6>
        </div>
      </div>
      <div className='row ms-4 pt-2'>
        <div className={`col-4 rounded-4 clearfix ${bgColorClass}`} style={{ height: '6em', width: '44%' }}>
        <h6 className='text-nowrap pt-2'>Sunrise
     <img src='/sunrise.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}>{sunrise} AM</h4></b>
     </h6>
        </div>
        <div className={`col-4 rounded-4 ms-3 ${bgColorClass}`} style={{ height: '6em', width: '44%' }}>
        <h6 className='text-nowrap pt-2'>Sunset
     <img src='/sunset.svg' width='32%' height='30%' className='float-end mx-auto'/>
     <b><h4 className='p-3 float-sm-end' style={{ fontWeight: "bold" }}>{sunset}</h4></b>
     </h6>
        </div>
      </div>
    </div>
  );
};

export default MetricsBox;

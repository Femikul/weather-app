import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import MetricsBox from '../components/MetricsBox'

const Small = ({ handleSearch, isMetric, setIsMetric, cityName, feelsLike, setCityName, weatherData, sunriseTime, sunsetTime, handleUnitChange, day, time, unit, name, description, country, isDarkMode, setIsDarkMode }) => {
   
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };
  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
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
  const handleToggleUnit = () => {
    setIsMetric((prevIsMetric) => !prevIsMetric);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  }; 
  

 const icon = weatherData?.weather[0]?.icon
  const temperatureFahrenheit = celsiusToFahrenheit(weatherData.main.temp);
  const temperatureCelsius = fahrenheitToCelsius(temperatureFahrenheit);
  const feelsLikeFahrenheit = celsiusToFahrenheit(weatherData.main.feels_like);
  const feelsLikeCelsius = fahrenheitToCelsius(weatherData.main.feels_like);
  const windSpeedMilesPerHour = metersPerSecondToMilesPerHour(weatherData.wind.speed);
  const windSpeedMetersPerSecond = milesPerHourToMetersPerSecond(windSpeedMilesPerHour);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    return () => {
      document.documentElement.removeAttribute('data-bs-theme');
    };
  }, [isDarkMode]);
  
  return (
        <div id="smallDiv" className='mx-auto shadow-lg rounded-4 bg-warning'>
            <div className="input-group p-3 me-2 mx-auto">
    <input type="text" className="form-control" placeholder="Search any City...."  value={cityName}  onChange={(e) => setCityName(e.target.value)}/>
    <button className="btn btn-success" type="submit" onClick={handleSearch}>Go</button> 
  </div>
  <h2 className='text-center text-dark'> {day},{time}</h2>
  <h2 className='text-center pt-1 text-dark'><b> {name},{country}</b></h2>
 <h6 className='text-center text-dark'>{description}</h6>
 <div style={{ height: "8em" }} className='text-center'>
 <Image
      className=""
      src={`/${icon}.svg`}
      alt="Sunrise"
      width="120"
      height="120"
    />
 </div>
 <h2 className='text-center text-dark'>  {isMetric ? `${Math.round(temperatureCelsius)}°C` : `${Math.round(temperatureFahrenheit)}°F`}</h2>
 <h6 className='text-center text-dark'>Feels like {isMetric ? `${Math.round(feelsLike)}°C` : `${Math.round(feelsLikeFahrenheit)}°F`}</h6>
<MetricsBox  weatherData={weatherData} isMetric={isMetric} setIsMetric={setIsMetric} sunrise={sunriseTime} sunset={sunsetTime} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
 
<div className='clearfix'>
<button className='float-start ms-4 btn btn-dark mt-4 btn-sm' onClick={toggleDarkMode}> {isDarkMode ? 'LightMode' : 'DarkMode'}
<Image
                className="float-end ms-1"
                src="/power.svg"
                alt="Wind direction"
                width="25"
                height="25"
              />
</button>
<div className='float-end ms-5 mt-4' style={{ width: "45%" }}>
      <p  className='btn btn-success btn-sm' onClick={handleToggleUnit}>Imperial System</p>
    <p  className={`btn btn-success btn-sm ms-2${isMetric ? 'active' : ''}`}     onClick={handleToggleUnit}>Metric System</p>
</div>
</div>

        </div>
    )
}

export default Small;
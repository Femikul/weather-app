import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Darkmode from '../components/Darkmode';
import UnitSwitch from '../components/UnitSwitch';

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
  
const WeatherData = (props) => {
  const {
    day,
    name,
    time,
    unit,
    cityName,
    setCityName,
    handleSearch,
    weatherData,
    sunriseTime,
    sunsetTime,
    isMetric,
    setIsMetric,
    isDarkMode,
    setIsDarkMode
  } = props;
   
  const toggleDarkMode = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    return () => {
      document.documentElement.removeAttribute('data-bs-theme');
    };
  }, [isDarkMode]);

  const windSpeedMilesPerHour = metersPerSecondToMilesPerHour(weatherData.wind.speed);
  const windSpeedMetersPerSecond = milesPerHourToMetersPerSecond(windSpeedMilesPerHour);
  const bgColorClass = isDarkMode ? 'bg-dark' : 'bg-light';
 
  return (
    <div className="col-8" id="row2">
      <div className="clearfix">
        <h3 className="pt-5 ms-2 float-start text-dark">
          {day}, {time}
        </h3>
        <div className="input-group pt-5 me-2 float-end" style={{ width: '35%' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search any City...."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button className="btn btn-success" type="submit" onClick={handleSearch}>
            Go
          </button>
          
        </div>
      </div>
      
        <div>
          <div className="mt-4 row">
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <Image
                className="mt-5 me-1 float-end"
                src="/wind.svg"
                alt="Wind speed"
                width="70"
                height="70"
              />
              <h4 className="text-end mt-2 me-1" style={{ position: 'absolute', fontSize: '100%' }}>
                Wind speed
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%', fontWeight: "bold" }}>
              {isMetric ? `${windSpeedMetersPerSecond} m/s` : `${windSpeedMilesPerHour} m/h`}
              </h5>
            </div>
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <Image
                className="mt-5 me-1 float-end"
                src="/humidity.svg"
                alt="Humidity"
                width="80"
                height="70"
              />
              <h4 className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ position: 'absolute', fontSize: '100%' }}>
                Humidity
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%' }}>
                <b>{weatherData.main.humidity} %</b>
              </h5>
            </div>
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <Image
                className="mt-5 me-1 float-end"
                src="/compass.svg"
                alt="Wind direction"
                width="70"
                height="70"
              />
              <h4 className="text-end mt-2 me-1" style={{ position: 'absolute', fontSize: '100%' }}>
                Wind direction
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%' }}>
                <b>{getWindDirection(weatherData.wind.deg)}</b>
              </h5>
            </div>
          </div>

          <div className="mt-5 row">
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <Image
                className="mt-5 float-end me-1"
                src="/binoculars.svg"
                alt="Visibility"
                width="70"
                height="70"
              />
              <h4 className="text-end mt-2 me-1" style={{ position: 'absolute', fontSize: '100%' }}>
                Visibility
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%' }}>
                <b>{weatherData.visibility} km</b>
              </h5>
            </div>
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <Image
                className="mt-5 me-1 float-end"
                src="/sunrise.svg"
                alt="Sunrise"
                width="90"
                height="80"
              />
              <h4 className="text-end mt-2" style={{ position: 'absolute', fontSize: '100%' }}>
                Sunrise
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%' }}>
                <b>{sunriseTime} AM</b>
              </h5>
            </div>
            <div className={`col4 ${bgColorClass} ms-4 rounded-4`} style={{ height: '8em', width: '27%' }}>
              <div className="float-end">
                <Image
                  className="mt-5"
                  src="/sunset.svg"
                  alt="Sunset"
                  width="70"
                  height="70"
                />
              </div>
              <h4 className="text-end mt-2 me-1" style={{ position: 'absolute', fontSize: '100%' }}>
                Sunset
              </h4>
              <h5 className="text-end mt-3 pt-3" style={{ position: 'absolute', fontSize: '150%' }}>
                <b>{sunsetTime}</b>
              </h5>
            </div>
          </div>
        </div>
     
      <div className="clearfix mt-5">
        <Darkmode toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setIsDarkmode={setIsDarkMode}/>
        <UnitSwitch  weatherData={weatherData} isMetric={isMetric} setIsMetric={setIsMetric}/>
      </div>
    </div>
  );
};

export default WeatherData;

'use client';
import React, { useState, useEffect } from 'react';
import Small from '../components/Small';
import FirstRow from '../components/FirstRow';
import WeatherData from '../components/WeatherData';
import moment from 'moment-timezone';
import Loading from '../components/Loading';

export default function Home() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [sunriseTime, setSunriseTime] = useState('');
  const [sunsetTime, setSunsetTime] = useState('');
  const [error, setError] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const API_KEY = 'fbcd7c6a0db57dbbfe2f7284ac4556cc';

  const unixToLocalTime = (unixSeconds, timezone) => {
    let time = new Date((unixSeconds + timezone) * 1000).toISOString().match(/(\d{2}:\d{2})/)[0];
    return time.startsWith('0') ? time.substring(1) : time;
  };

  const getTimeAndDay = (timezone) => {
    const localTime = new Date(Date.now() + timezone * 1000);
    const timeZoneOffset = localTime.getTimezoneOffset() * 60 * 1000;
    const localTimeWithOffset = localTime.getTime() + timeZoneOffset;
    const formattedTime = new Date(localTimeWithOffset).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const formattedDay = localTime.toLocaleString('en-US', {
      weekday: 'long',
    });
    setTime(formattedTime);
    setDay(formattedDay);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setCityName('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName || 'Ilorin'}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message || 'Unknown error');
      } else {
        setError(false);
      }
      const visibilityInKm = convertVisibilityToKm(data.visibility);
      setWeatherData({ ...data, visibility: visibilityInKm });
      console.log('Fetched Data:', data);
      console.log('Updated weatherData:', weatherData);
  

      const timezoneOffset = data.timezone;
      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;
      const localSunriseTime = unixToLocalTime(sunriseTimestamp, timezoneOffset);
      const localSunsetTime = unixToLocalTime(sunsetTimestamp, timezoneOffset);

      setSunriseTime(localSunriseTime);
      const sunsetHours = parseInt(localSunsetTime.substring(0, 2));
      const sunsetMinutes = localSunsetTime.substring(3, 5);
      const amOrPm = sunsetHours >= 12 ? 'PM' : 'AM';
      const twelveHourFormatHours = sunsetHours % 12 || 12;
      const formattedSunsetTime = `${twelveHourFormatHours}:${sunsetMinutes} ${amOrPm}`;
      setSunsetTime(formattedSunsetTime);

      if (data.timezone) {
        getTimeAndDay(data.timezone);
      }
    } catch (error) {
      setError(error.message || 'Unknown error');
    } finally {
      setIsLoading(false);
      setIsFirstSearch(false);
    }
  };

  const convertVisibilityToKm = (visibilityInMeters) => {
    const visibilityInKm = (visibilityInMeters / 1000).toFixed(2);
    return visibilityInKm;
  };
 
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div id="container" className="mx-auto m-5">
      {error ? ( 
        <div className="mx-auto container" style={{ marginTop: '15%' }}>
          <h1 className="text-center display-3 mx-auto m-5">
            <b>City Not Found, Try again!</b>
          </h1>
          <div className="input-group p-3 me-2 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search any City...."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              style={{ width: '70%' }}
            />
            <button className="btn btn-warning" type="submit" onClick={handleSearch}>
              Go
            </button>
          </div>
        </div>
      ) : isFirstSearch && isLoading ? (
       <Loading />
      ) : (
        <>
          <Small
            handleSearch={handleSearch}
            cityName={cityName}
            setCityName={setCityName}
            weatherData={weatherData}
            sunriseTime={sunriseTime}
            sunsetTime={sunsetTime}
            day={day}
            time={time}
            name={weatherData?.name}
            description={weatherData?.weather[0]?.description}
            country={weatherData?.sys?.country}
            isMetric={isMetric}
              setIsMetric={setIsMetric}
              feelsLike={weatherData?.main?.feels_like}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
          />
          <div id="centered-div" className="row mx-auto shadow-lg">
            <FirstRow
              name={weatherData?.name}
              country={weatherData?.sys?.country}
              description={weatherData?.weather[0]?.description}
              feelsLike={weatherData?.main?.feels_like}
              isMetric={isMetric}
              setIsMetric={setIsMetric}
              weatherData={weatherData}
            />

            <WeatherData
              day={day}
              time={time}
              cityName={cityName}
              name={weatherData?.name}
              setCityName={setCityName}
              handleSearch={handleSearch}
              weatherData={weatherData}
              sunriseTime={sunriseTime}
              sunsetTime={sunsetTime}
              isMetric={isMetric}
              setIsMetric={setIsMetric}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </div>
        </>
      )}
    </div>
  );
}

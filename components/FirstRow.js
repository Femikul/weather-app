import Image from 'next/image';

const FirstRow = ({ name, country, description, temp, feelsLike, isMetric, setIsMetric, weatherData }) => {
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };
  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };
 const icon = weatherData?.weather[0]?.icon
  const temperatureFahrenheit = celsiusToFahrenheit(weatherData.main.temp);
  const temperatureCelsius = fahrenheitToCelsius(temperatureFahrenheit);
  const feelsLikeFahrenheit = celsiusToFahrenheit(weatherData.main.feels_like);
  const feelsLikeCelsius = fahrenheitToCelsius(weatherData.main.feels_like);
return (
        <div className="col-4" id="row1">
        <h2 className="pt-5 text-center text-dark">
          <b>{name},{country}</b>
        </h2>
        <h4 className="text-center text-dark">{description}</h4>
        <div className="h-50 text-center"><Image
      className="mt-5"
      src={`/${icon}.svg`}
      alt="Sunrise"
      width="180"
      height="180"
    /></div>
        <h1 className="text-center text-dark">
        {isMetric ? `${Math.round(temperatureCelsius)}°C` : `${Math.round(temperatureFahrenheit)}°F`}
        </h1>
        <h4 className="text-center text-dark">
        Feels like {isMetric ? `${Math.round(feelsLike)}°C` : `${Math.round(feelsLikeFahrenheit)}°F`}
        </h4>
      </div>
    )
}
export default FirstRow;
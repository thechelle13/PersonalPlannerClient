import React, { useState, useEffect } from 'react';
import './pages.css';
import blueSkyPhoto from '../assets/blue-sky.jpg';

export const Weather = ({ currentUser }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [zipCode, setZipCode] = useState(currentUser?.pp_user?.zipcode || '');
  const [selectedDay, setSelectedDay] = useState(null);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      if (!zipCode) {
        window.alert('Please enter a ZIP code before getting the weather.');
        return;
      }

      const apiKey = 'my_api_key';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}&units=imperial`);
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [currentUser]);

  const handleGetWeather = () => {
    fetchWeatherData();
  };

  // Function to format date as "MM/DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Function to format time as "h:mm AM/PM"
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  // Group forecast items by date
  const groupedForecast = {};
  if (weatherData && weatherData.list) {
    weatherData.list.forEach((forecastItem) => {
      const date = formatDate(forecastItem.dt_txt);
      if (!groupedForecast[date]) {
        groupedForecast[date] = [];
      }
      groupedForecast[date].push(forecastItem);
    });
  }

  const handleDaySelect = (date) => {
    setSelectedDay(selectedDay === date ? null : date);
  };

  

  return (
    <div className="container mx-auto p-8 max-w-xl">  
      <h1 className="text-3xl font-bold mb-4 text-Seafoam">Weather</h1>
      {Object.keys(groupedForecast).map((date, index) => (
        <div key={index} className="rounded-lg p-4 mb-4" style={{ backgroundImage: `url(${blueSkyPhoto})`, backgroundSize: 'cover' }}>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => handleDaySelect(date)}>
            <img src={getWeatherIconUrl(groupedForecast[date][0].weather[0].icon)} alt="Weather Icon" className="inline-block w-8 h-8 mr-2" />
              {date}
            </button>
            <div className="dropdown-content" style={{ display: selectedDay === date ? 'block' : 'none' }}>
              {groupedForecast[date].map((forecastItem, index) => (
                <div key={index} className="card">
                  <img src={getWeatherIconUrl(forecastItem.weather[0].icon)} alt="Weather Icon" />
                  <div>
                    <p>{formatTime(forecastItem.dt_txt)}</p>
                    <p>{forecastItem.main.temp}°F</p>
                    <details>
                      <summary>More Info</summary>
                      <p>Temperature: {forecastItem.main.temp}°F</p>
                      <p>Feels Like: {forecastItem.main.feels_like}°F</p>
                      <p>Weather: {forecastItem.weather[0].description}</p>
                      <p>Humidity: {forecastItem.main.humidity}%</p>
                      <p>Wind Speed: {forecastItem.wind.speed} mph</p>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="card">
        <div className="input-container">
          <div className="text-Seafoam">Enter ZIP Code: </div>
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={handleZipCodeChange}
            placeholder="e.g., 12345"
            required
          />
          <button className="text-center font-bold p-2 border border-black bg-blue-900 text-white rounded-md" onClick={handleGetWeather}>Get Weather</button>
        </div>
      </div>
    </div>
  );

};

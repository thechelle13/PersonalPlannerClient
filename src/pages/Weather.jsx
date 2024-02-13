import React, { useState, useEffect } from 'react';
import './pages.css';

export const Weather = ({ currentUser }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [zipCode, setZipCode] = useState(currentUser.pp_user.zipcode || '');

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      if (!zipCode) {
        window.alert('Please enter a ZIP code before getting the weather.');
        return;
      }

      const apiKey = 'your_key_here';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}&units=imperial`);
      const data = await response.json();

      // Extracting forecast for the next 5 days
      const forecastData = data.list.slice(0, 5);

      setWeatherData(forecastData);
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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Weather</h1>
      {weatherData && (
        <div>
          {weatherData.map((forecastItem, index) => (
            <div key={index} className="card">
              <p>Date: {formatDate(forecastItem.dt_txt)}</p>
              <p>Time: {formatTime(forecastItem.dt_txt)}</p>
              <p>Temperature: {forecastItem.main.temp}°F</p>
              <p>Weather: {forecastItem.weather[0].description}</p>
              <p>Humidity: {forecastItem.main.humidity}%</p>
              <p>Wind Speed: {forecastItem.wind.speed} mph</p>
            </div>
          ))}
        </div>
      )}
      <div className="card">
        <div className="input-container">
          <div>Enter ZIP Code: </div>
          <input
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
            placeholder="e.g., 12345"
            required
          />
          <button  className="text-center font-bold p-2 border border-black bg-blue-900 text-white rounded-md" onClick={handleGetWeather}>Get Weather</button>
        </div>
      </div>
    </div>
  );
};

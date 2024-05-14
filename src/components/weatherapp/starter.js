import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Alert } from 'antd';
const { Title, Text } = Typography;

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add your API key
    // Fetch current position
    // Fetch weather data using latitude, longitude, and API key
  }, []);

  const getCurrentPosition = () => {
    // Function to get current position
  };

  const fetchWeather = async (latitude, longitude, apiKey) => {
    // Function to fetch weather data
  };

  const kelvinToCelsius = (kelvin) => {
    // Function to convert temperature from Kelvin to Celsius
  };

  const getWeatherIconUrl = (iconCode) => {
    // Function to get weather icon URL
  };

  return (
    <>
      {isLoading ? (
        <Alert message="Loading..." type="info" />
      ) : errorMessage ? (
        <Alert message={errorMessage} type="error" />
      ) : (
        <Card
          bordered={true}
          style={{
            width: 550,
            margin: '0 auto',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Title level={4}>{weatherData.name}</Title>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Text style={{ fontSize: '55px', fontWeight: 'bold', marginTop: '18px' }}>
                {kelvinToCelsius(weatherData.main.temp)} °C
              </Text>
              <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" style={{ width: '125px', height: '125px' }} />
            </div>
            <Text style={{ fontStyle: 'italic' }}>{weatherData.weather[0].description}</Text>
            <List
              grid={{
                gutter: 16,
                column: 2,
              }}
              dataSource={[
                {
                  title: 'Temps °C (High / Low)',
                  desc: `${kelvinToCelsius(weatherData.main.temp_max)} °C / ${kelvinToCelsius(weatherData.main.temp_min)} °C`,
                },
                {
                  title: 'Humidity % / Pressure hPa',
                  desc: `${weatherData.main.humidity} % / ${weatherData.main.pressure} hPa`,
                },
                {
                  title: 'Wind Speed m/s',
                  desc: `${weatherData.wind.speed} m/s`,
                },
                {
                  title: 'Sunrise / Sunset Time',
                  desc: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() + ' / ' + new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}
                    title={item.title}
                  >
                    {item.desc}
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default Weather;

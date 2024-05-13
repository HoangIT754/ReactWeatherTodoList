import React, { useState, useEffect, useReducer } from 'react';
import { Card, Typography, List, FloatButton, Modal, Button, Form, Alert } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const Weather = () => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [ApiKey, setApiKey] = useState('c00ad92e2fd72c4fea1afc8a1ceab792');
  const [ListData, setListData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setErrorMessage('Error getting location information. Please make sure location services are enabled.');
          setIsLoading(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by your browser.');
      setIsLoading(false);
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
      setListData([
        {
          title: 'Temps °C (High / Low)',
          desc: `${kelvinToCelsius(data.main.temp_max)} °C / ${kelvinToCelsius(data.main.temp_min)} °C`,
        },
        {
          title: 'Humidity % / Pressure hPa',
          desc: `${data.main.humidity} % / ${data.main.pressure} hPa`,
        },
        {
          title: 'Wind Speed m/s',
          desc: `${data.wind.speed} m/s`,
        },
        {
          title: 'Sunrise / Sunset Time',
          desc: new Date(data.sys.sunrise * 1000).toLocaleTimeString() + ' / ' + new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('Error fetching weather data.');
      setIsLoading(false);
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const getWeatherIconUrl = (iconCode) => {
    const iconType = iconCode.endsWith('n') ? iconCode.replace('n', 'd') : iconCode;
    return `https://openweathermap.org/img/wn/${iconType}.png`;
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
              dataSource={ListData}
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

/* eslint-disable no-restricted-syntax */
import React, { createContext, useContext, useCallback, useState } from 'react';
import env from 'react-native-config';

import { weatherapi } from '../services/weatherapi';
import { capitalizeFirst } from '../utils/Utils';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const processForecast = useCallback(data => {
    const forecast = [];
    for (const day of data) {
      forecast.push({
        weather: {
          main: day.weather[0].main,
          id: day.weather[0].id,
          wind: day.wind_speed,
          humidity: day.humidity,
        },
        temp: {
          day: Math.trunc(day.temp.day),
          night: Math.trunc(day.temp.night),
          eve: Math.trunc(day.temp.eve),
          morn: Math.trunc(day.temp.morn),
        },
      });
    }
    return forecast;
  }, []);

  const processWeather = useCallback(
    data => {
      const { current } = data;
      const forecast = data.daily;
      const weather = {
        current: {
          date: new Date(current.dt * 1000),
          sunrise: current.sunrise,
          sunset: current.sunset,
          weather: {
            main: capitalizeFirst(current.weather[0].description),
            id: current.weather[0].id,
            wind: Math.round(current.wind_speed * 10) / 10,
            humidity: current.humidity,
          },
          temp: Math.trunc(current.temp),
        },
        forecast: processForecast(forecast),
      };
      return weather;
    },
    [processForecast],
  );

  const getWeather = useCallback(
    async ({ lat, lon }) => {
      setLoading(true);
      try {
        // eslint-disable-next-line
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&lang=pt_br&units=metric&appid=${env.WEATHER_API_KEY}`,
        );
        // const response = await weatherapi.get(
        //   `?lat=${lat}&lon=${lon}&exclude=hourly,minutely&lang=pt_br&units=metric&appid=${weatherkey}`,
        // );
        const json = await response.json();
        const weather = processWeather(json);
        setLoading(false);
        return weather;
      } catch (err) {
        setLoading(false);
        throw new Error(err.response);
      }
    },
    [processWeather],
  );

  return (
    <WeatherContext.Provider value={{ getWeather, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used whithin an WeatherProvider');
  }

  return context;
}

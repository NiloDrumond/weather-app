/* eslint-disable no-restricted-syntax */
import React, { createContext, useContext, useCallback } from 'react';
import { weatherkey } from '../global';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const processForecast = useCallback(data => {
    const forecast = new Map();
    for (const day of data) {
      forecast.set(day.dt, {
        weather: {
          main: day.weather.main,
          id: day.weather,
          wind: day.wind_speed,
          humidity: day.humidity,
        },
        temp: {
          day: day.temp.day,
          night: day.temp.night,
          eve: day.temp.eve,
          morn: day.temp.morn,
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
          weather: {
            main: current.weather.main,
            id: current.weather.id,
            wind: current.wind_speed,
            humidity: current.humidity,
          },
          temp: current.temp,
        },
        forecast: processForecast(forecast),
      };
      return weather;
    },
    [processForecast],
  );

  const getWeather = useCallback(
    async ({ lat, lon }) => {
      try {
        // eslint-disable-next-line
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherkey}`,
        );
        const json = await response.json();
        const weather = processWeather(json);
        return weather;
      } catch (err) {
        throw new Error(err);
      }
    },
    [processWeather],
  );

  return (
    <WeatherContext.Provider value={{ getWeather }}>
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

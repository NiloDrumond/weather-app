import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { WEATHER_KEY } from 'react-native-dotenv';
import {
  weatherCurrentApi,
  weatherNextApi,
  weatherApi,
} from '../services/weatherApi';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState();

  const processCurrent = useCallback(rawData => {
    const processedData = {
      city: {
        name: rawData.name,
        id: rawData.id,
      },
      weather: {
        id: rawData.weather[0].id,
        main: rawData.weather[0].main,
      },
      main: rawData.main,
    };

    console.log(processedData);
  }, []);

  const getWeatherByCoordinate = useCallback(async ({ lat, lon }) => {
    try {
      let response = await weatherApi.get(
        `?lat=-8.05&lon=-34.88&appid=${WEATHER_KEY}`,
      );
      response = await weatherCurrentApi.get(
        `?lat=-8.05&lon=-34.88&appid=${WEATHER_KEY}`,
      );
      response = await weatherNextApi.get(
        `?lat=-8.05&lon=-34.88&appid=${WEATHER_KEY}`,
      );
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  const getWeatherByName = useCallback(name => {
    return data;
  }, []);

  return (
    <WeatherContext.Provider
      value={{ data, getWeatherByCoordinate, getWeatherByName }}
    >
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

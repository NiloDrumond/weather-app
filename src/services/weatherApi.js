import axios from 'axios';

export const weatherForecastApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
});

export const weatherCurrentApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

// 404
export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
});

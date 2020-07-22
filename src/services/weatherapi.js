import axios from 'axios';

export const weatherapi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
});

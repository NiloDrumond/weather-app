import React from 'react';

import { WeatherProvider } from './weather';

const AppProvider = ({ children }) => {
  return <WeatherProvider>{children}</WeatherProvider>;
};

export default AppProvider;

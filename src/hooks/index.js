import React from 'react';

import { WeatherProvider } from './weather';
import { FavoritesProvider } from './favorites';

const AppProvider = ({ children }) => {
  return (
    <WeatherProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </WeatherProvider>
  );
};

export default AppProvider;

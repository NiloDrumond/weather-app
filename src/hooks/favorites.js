import React, { createContext, useContext, useState, useCallback } from 'react';
import { useWeather } from './weather';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const { getWeather } = useWeather();

  const checkName = useCallback(
    name => {
      const found = favorites.find(city => city.name === name);
      if (found === undefined) {
        return true;
      }
      return false;
    },
    [favorites],
  );

  const addFavorite = useCallback(
    async ({ name, coord }) => {
      const newFavorite = {
        name,
        coord,
        weather: await getWeather(coord),
      };
      setFavorites([newFavorite, ...favorites]);
    },
    [favorites, getWeather],
  );

  const update = useCallback(async () => {
    const newFavorites = [];
    favorites.forEach(async city => {
      const newFavorite = {
        weather: await getWeather(city.coord),
        ...city,
      };
      newFavorites.push(newFavorite);
    });
    setFavorites(newFavorites);
  }, [favorites, getWeather]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, update, addFavorite, checkName }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used whithin an FavoritesProvider');
  }

  return context;
}

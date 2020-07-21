import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { useWeather } from './weather';

const FavoritesContext = createContext();
const storageKey = '@weatherapp:favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getWeather } = useWeather();

  useEffect(() => {
    async function loadStoredData() {
      const loadedFavorites = await AsyncStorage.getItem(storageKey);
      if (loadedFavorites) {
        setFavorites(JSON.parse(loadedFavorites));
      }
      setLoading(false);
    }

    loadStoredData();
  }, []);

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

  const removeFavorite = useCallback(async name => {
    setFavorites([]);
    await AsyncStorage.removeItem(storageKey);
  }, []);

  const editFavorite = useCallback(
    async (currentName, name) => {
      const favorite = favorites.find(item => item.name === currentName);
      favorite.name = name;
      const newFavorites = [
        favorite,
        ...favorites.filter(item => item.name !== name),
      ];
      await AsyncStorage.setItem(storageKey, JSON.stringify(newFavorites));
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
      const newFavorites = [newFavorite, ...favorites];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newFavorites));
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
      value={{
        favorites,
        loading,
        update,
        addFavorite,
        checkName,
        removeFavorite,
        editFavorite,
      }}
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

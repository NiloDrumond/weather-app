import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useWeather } from '../hooks/weather';
import { useFavorites } from '../hooks/favorites';

import CityWeather from '../pages/CityWeather';
import Home from '../pages/Home';
import Map from '../pages/Map';

const App = createStackNavigator();

const Routes = () => {
  const { loading } = useWeather();
  const { loading: favoriteLoading, update } = useFavorites();

  useEffect(() => {
    update();
  }, []);

  if (loading || favoriteLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return (
    <App.Navigator>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="CityWeather" component={CityWeather} />
      <App.Screen name="Map" component={Map} />
    </App.Navigator>
  );
};

export default Routes;

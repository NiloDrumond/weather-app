import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useWeather } from '../hooks/weather';

import Day from '../pages/Day';
import Home from '../pages/Home';
import Map from '../pages/Map';

const App = createStackNavigator();

const Routes = () => {
  const { loading } = useWeather();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return (
    <App.Navigator>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Day" component={Day} />
      <App.Screen name="Map" component={Map} />
    </App.Navigator>
  );
};

export default Routes;

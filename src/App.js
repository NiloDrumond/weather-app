import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

// Warning referente a passagem da função refreshFavorites de Home para CityWeather
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: 'rgba(255, 48, 79, 1)' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;

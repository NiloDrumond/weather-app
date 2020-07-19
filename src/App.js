import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

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

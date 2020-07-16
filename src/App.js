import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <View style={{ flex: 1, backgroundColor: '#00000' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;

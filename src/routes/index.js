import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Day from '../pages/Day';
import Home from '../pages/Home';
import Map from '../pages/Map';

const App = createStackNavigator();

const Routes = () => (
  <App.Navigator>
    {/* <App.Screen name="Home" component={Home} />
    <App.Screen name="Day" component={Day} /> */}
    <App.Screen name="Map" component={Map} />
  </App.Navigator>
);

export default Routes;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Day from '../pages/Day';
import Home from '../pages/Home';

const App = createStackNavigator();

const Routes = () => (
  <App.Navigator>
    {/* <App.Screen name="Home" component={Home} /> */}
    <App.Screen name="Day" component={Day} />
  </App.Navigator>
);

export default Routes;

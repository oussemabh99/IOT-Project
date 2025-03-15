import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WAN from './wan';
import LAN from './lan';
import Selection from './selection';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection">
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="WAN" component={WAN} />
        <Stack.Screen name="LAN" component={LAN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

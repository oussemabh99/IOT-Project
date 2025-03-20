import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LAN from './lan';
import Selection from './selection';
import main from './main'
import ConnectionError from './ConnectionError';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Error" >
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="LAN" component={LAN} />
        <Stack.Screen name="main" component={main} />
        <Stack.Screen name="Error" component={ConnectionError} initialParams={{ error: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

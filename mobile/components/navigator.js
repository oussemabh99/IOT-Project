import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LAN from './Navigation/lan';
import Selection from './Navigation/selection';
import main from './Navigation/main'
import ConnectionError from './Navigation/ConnectionError';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selection" >
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="LAN" component={LAN} />
        <Stack.Screen name="main" component={main} />
        <Stack.Screen name="Error" component={ConnectionError} initialParams={{ error: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

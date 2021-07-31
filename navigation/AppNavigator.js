import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import EditUserScreen from '../screens/EditUserScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Users" component={HomeScreen} />
          <Stack.Screen name="Edit User Details" component={EditUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default AppNavigator; 
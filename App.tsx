import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailedScreen from './screens/NewsDetailedScreen';
import { useAuthStore } from './store/authStore';
import { Spinner } from 'native-base';
import { Provider } from 'react-native-paper';
import { theme } from './utils';
import HomeScreen from './screens/HomeScreen';

const screen = Dimensions.get('screen');
const Stack = createStackNavigator();

export default function App() {

  const isSigned = useAuthStore(state => state.isSigned);
  console.log(isSigned);

  const tokenAuth = useAuthStore(state => state.tokenAuth);

  useEffect(() => {
    tokenAuth();
  }, []);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        {
          !isSigned ?
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
            </Stack.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name='News' component={NewsScreen} />
              <Stack.Screen name='NewsDetailed' component={NewsDetailedScreen} />
            </Stack.Navigator>
        }
      </NavigationContainer>
    </Provider>
  );
}
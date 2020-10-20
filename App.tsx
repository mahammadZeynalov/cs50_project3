import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import NewsScreen from './screens/NewsScreen';
import { useAuthStore } from './store/authStore';
import { Provider } from 'react-native-paper';
import { theme } from './utils';
import HomeScreen from './screens/HomeScreen';

const screen = Dimensions.get('screen');
const Stack = createStackNavigator();

export default function App() {

  const isSigned = useAuthStore(state => state.isSigned);

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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='News' component={NewsScreen} />
            </Stack.Navigator>
        }
      </NavigationContainer>
    </Provider>
  );
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailedScreen from './screens/NewsDetailedScreen';

const screen = Dimensions.get('screen');
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='SignIn' component={SignInScreen} />
      </Stack.Navigator>
      <Stack.Navigator>
        <Stack.Screen name='News' component={NewsScreen} />
        <Stack.Screen name='NewsDetailed' component={NewsDetailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'black'
  },
});

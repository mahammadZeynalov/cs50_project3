import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailedScreen from './screens/NewsDetailedScreen';
import { useAuthStore } from './store/authStore';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from 'native-base';

const screen = Dimensions.get('screen');
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {

  const tokenAuth = useAuthStore(state => state.tokenAuth);
  const loginLoading = useAuthStore(state => state.loginLoading);
  const loginError = useAuthStore(state => state.loginError);

  useEffect(() => {
    tokenAuth();
  }, []);
  return (
    <NavigationContainer>
      {
        loginError ?
          <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
          </Stack.Navigator>
          :
          <Stack.Navigator>
            <Stack.Screen name='News' component={NewsScreen} />
            <Stack.Screen name='NewsDetailed' component={NewsDetailedScreen} />
          </Stack.Navigator>
      }
      {
        loginLoading &&
        <View style = {styles.fullScreen}>
          <Spinner />
        </View>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

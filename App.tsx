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
  const isSigned = useAuthStore(state => state.isSigned);
  const tokenAuthLoading = useAuthStore(state => state.tokenAuthLoading);

  useEffect(() => {
    tokenAuth();
  }, []);
  return (
    <NavigationContainer>
      {
        tokenAuthLoading ?
          <View style={styles.fullScreen}>
            <Spinner />
          </View> :
          !isSigned ?
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

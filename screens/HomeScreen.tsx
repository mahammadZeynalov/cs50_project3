import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Trump News</Header>

    <Paragraph>
      The hottest news about the most extravagant president
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('Register')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
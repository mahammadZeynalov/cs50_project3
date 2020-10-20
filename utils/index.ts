import { DefaultTheme } from 'react-native-paper';
export const url: string = 'http://192.168.1.3:3000/api';
export const api_key = '0dc0391886764d96b958dbe8a8b4b682';
export const defaultImage = 'https://d279m997dpfwgl.cloudfront.net/wp/2019/07/AP_19201004713022-1000x667.jpg';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#BB1919',
    secondary: 'black',
    error: '#f13a59',
  },
};
export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';
  
    return '';
  };
  
  export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
  
    return '';
  };
  
  export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  };
  
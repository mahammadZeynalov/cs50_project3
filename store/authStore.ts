import create from 'zustand';
import { IUser } from '../types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { url } from '../utils';

type AuthStore = {
    isSigned: boolean
    user: IUser | null
    login: (email: string, password: string) => Promise<any>
    tokenAuth: () => Promise<any>
    logout: () => Promise<any>
    register: (email: string, password: string) => Promise<any>
}

export const useAuthStore = create<AuthStore>(set => ({
    isSigned: false,
    user: null,
    login: async (email, password) => {
        const credentials = { email, password };
        const { data } = await axios.post(`${url}/auth/login`, credentials);
        const user: IUser = {
            email: data.email,
            token: data.token,
        };
        set({ user, isSigned: true });
        await AsyncStorage.setItem('user', JSON.stringify(user));
        const test = await AsyncStorage.getItem('user');
    },
    tokenAuth: async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            await axios.post(`${url}/auth/token`, JSON.parse(user));
            set({ isSigned: true })
        }
    },
    logout: async () => {
        await AsyncStorage.clear();
        set({ user: null, isSigned: false });
    },
    register: async (email, password) => {
        const credentials = { email, password }
        await axios.post(`${url}/auth/register`, credentials);
    }
}));

import create from 'zustand';
import { IUser } from '../types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { url } from '../utils'

type AuthStore = {
    isSigned: boolean
    user: IUser | null
    loginLoading: boolean
    registerLoading: boolean
    tokenAuthLoading: boolean
    tokenAuthError: boolean
    loginError: boolean
    registerError: boolean
    login: (email: string, password: string) => Promise<any>
    tokenAuth: () => Promise<any>
    logout: () => Promise<any>
    register: (email: string, password: string) => Promise<any>
}

export const useAuthStore = create<AuthStore>(set => ({
    isSigned: false,
    user: null,
    loginLoading: false,
    registerLoading: false,
    tokenAuthLoading: false,
    tokenAuthError: false,
    loginError: false,
    registerError: false,
    login: async (email, password) => {
        const credentials = { email, password };
        set({ loginLoading: true });
        try {
            const { data } = await axios.post(`${url}/auth/login`, credentials);
            const user: IUser = {
                email: data.email,
                token: data.token,
            };
            set({ user, isSigned: true });
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            set({ loginError: true })
        } finally {
            set({ loginLoading: false })
        }
    },
    tokenAuth: async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            set({ tokenAuthLoading: true });
            try {
                const response = await axios.post(`${url}/auth/token`, user);
                set({ isSigned: true })
            } catch (error) {
                console.log(error);
                await AsyncStorage.clear();
                set({ tokenAuthError: true })
            } finally {
                set({ tokenAuthLoading: false })
            }
        } else {
            set({ tokenAuthError: true })
        }

    },
    logout: async () => {
        await AsyncStorage.clear();
        set({ user: null });
    },
    register: async (email, password) => {
        const credentials = { email, password }
        set({ registerLoading: true });
        try {
            await axios.post(`${url}/auth/`, credentials);
        } catch {
            set({ registerError: true })
        } finally {
            set({ registerLoading: false })
        }
    }
}));

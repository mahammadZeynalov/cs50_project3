import create from 'zustand';
import { IUser } from '../types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

type AuthStore = {
    user: IUser | null
    loginLoading: boolean
    registerLoading: boolean
    loginError: boolean
    registerError: boolean
    login: (email: string, password: string) => Promise<any>
    tokenAuth: () => Promise<any>
    logout: () => Promise<any>
    register: (email: string, password: string) => Promise<any>
}

export const useAuthStore = create<AuthStore>(set => ({
    user: null,
    loginLoading: false,
    registerLoading: false,
    loginError: false,
    registerError: false,
    login: async (email, password) => {
        const credentials = { email, password };
        set({ loginLoading: true });
        try {
            const { data } = await axios.post(`/auth/login`, credentials);
            const user: IUser = {
                email: data.email,
                token: data.token,
            };
            set({ user });
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
            const token: string = (JSON.parse(user)).token;
            set({ loginLoading: true });
            try {
                const { data } = await axios.post('/auth/token', token);
            } catch (error) {
                await AsyncStorage.clear();
                set({ loginError: true })
            } finally {
                set({ loginLoading: false })
            }
        } else {
            set({ loginError: true })
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
            await axios.post('/auth/register', credentials);
        } catch {
            set({ registerError: true })
        } finally {
            set({ registerLoading: false })
        }
    }
}));

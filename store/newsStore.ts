import create from 'zustand';
import { api_key } from '../utils';
import axios from 'axios';
import { IArticle, IError, IResponse } from '../types';

type NewsStoreState = {
    news: IArticle[]
    loading: boolean
    error: string
    pageSize: number
    page: number
    fetchNews: (option: string) => Promise<any>
}

export const useNewsStore = create<NewsStoreState>((set, get) => ({
    news: [],
    loading: false,
    error: '',
    pageSize: 2,
    page: 1,
    fetchNews: async (option) => {
        set({ loading: true, error: '' })
        setTimeout(async () => {
            try {
                if (option === 'fetchMore') {
                    set(state => ({ page: state.page + 1 }));
                    const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${api_key}&pageSize=${get().pageSize}&page=${get().page}`);
                    set(state => ({ news: [...state.news, ...data.articles] }));
                } else {
                    const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${api_key}&pageSize=${get().pageSize}&page=1`);
                    set({ news: data.articles });
                }
            } catch (error) {
                set({ error: error.message })
            } finally {
                set({ loading: false })
            }
        }, 2000)
    }
}))
import create from 'zustand';
import { api_key } from '../utils';
import axios from 'axios';
import { IArticle, IError, IResponse } from '../types';

type NewsStoreState = {
    news: IArticle[]
    loading: boolean
    error: string
    fetchNews: () => Promise<IResponse | IError>
}

export const useNewsStore = create<NewsStoreState>(set => ({
    news: [],
    loading: false,
    error: '',
    fetchNews: async () => {
        try {
            set({ loading: true, error: '' })
            const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${api_key}`);
            set({ news: data.articles });
            return data;
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    }
}))
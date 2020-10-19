import create from 'zustand';
import { api_key } from '../utils';
import axios from 'axios';
import { IArticle, IError, IResponse } from '../types';

type NewsStoreState = {
    news: IArticle[]
    fetchNews: () => Promise<IResponse | IError >
}

export const useNewsStore = create<NewsStoreState>(set => ({
    news: [],
    fetchNews: async () => {
        const { data } = await axios.get(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${api_key}`);
        set({ news: data.articles });
        return data;
    }
}))
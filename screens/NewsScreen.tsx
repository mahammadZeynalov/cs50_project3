import React, { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import { FlatList, Text } from 'react-native';
import { useNewsStore } from '../store/newsStore';
import { IArticle } from '../types';
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';

const NewsScreen: React.FC = () => {

    const news = useNewsStore(state => state.news);
    const fetchNews = useNewsStore(state => state.fetchNews);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    console.log(news.length);

    useEffect(() => {
        const getNewsAsync = async () => {
            try {
                setLoading(true);
                await fetchNews();
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        getNewsAsync();
    }, []);

    const renderItem = (props: any) => {
        const item: IArticle = props.item
        return (
            <Text>{item.title}</Text>
        )
    };

    return (
        <>
            <AppBar />
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.publishedAt}
            />
        </>
    )
};

export default NewsScreen;
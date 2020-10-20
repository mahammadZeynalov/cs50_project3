import React, { useEffect } from 'react';
import AppBar from '../components/AppBar';
import Error from '../components/Error';
import { FlatList } from 'react-native';
import { useNewsStore } from '../store/newsStore';
import { IArticle, Navigation } from '../types';
import Card from '../components/Card';
import Spinner from 'react-native-loading-spinner-overlay';

interface IProps {
    navigation: Navigation;
    item: IArticle
};

interface IRenderItemProps {
    item: IArticle
}

const NewsScreen = () => {

    const news = useNewsStore(state => state.news);
    const fetchNews = useNewsStore(state => state.fetchNews);
    const loading = useNewsStore(state => state.loading);
    const error = useNewsStore(state => state.error);

    useEffect(() => {
        fetchNews();
    }, []);

    const renderItem = ({ item }: IRenderItemProps) => {
        return (
            <Card
                url={item.url}
                title={item.title}
                description={item.description}
                urlToImage={item.urlToImage}
                name={item.source.name}
                publishedAt={item.publishedAt}
            />
        )
    }

    return (
        <>
            <AppBar />

            <Error error={error} />

            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.url}
            />

            <Spinner
                visible={loading}
                textContent={'Loading...'}
            />
        </>
    )
};

export default NewsScreen;
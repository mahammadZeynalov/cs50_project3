import React, { useEffect } from 'react';
import AppBar from '../components/AppBar';
import Error from '../components/Error';
import { FlatList, RefreshControl } from 'react-native';
import { useNewsStore } from '../store/newsStore';
import { IArticle, Navigation } from '../types';
import Card from '../components/Card';
import { Spinner as NativeBaseSpinner } from 'native-base';
import { theme } from '../utils';

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
        fetchNews('initialFetch');
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

    // Render Footer
    const renderFooter = () => {
        if (loading && news.length > 0) return <NativeBaseSpinner animating={true} color={theme.colors.primary} />
        else return <NativeBaseSpinner animating={false} />
    };

    return (
        <>
            <AppBar />

            <Error error={error} />

            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(_, index) => String(index)}
                onEndReached={() => fetchNews('fetchMore')}
                ListFooterComponent={renderFooter}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchNews('refresh')} />}
            />
        </>
    )
};

export default NewsScreen;
import React, { memo } from 'react';
import { Appbar as PaperAppBar } from 'react-native-paper';
import { useAuthStore } from '../store/authStore';
import { useNewsStore } from '../store/newsStore';

const Appbar: React.FC = () => {

    const logout = useAuthStore(state => state.logout);
    const fetchNews = useNewsStore(state => state.fetchNews);
    return (
        <PaperAppBar.Header>
            <PaperAppBar.Content title="News" />
            <PaperAppBar.Action icon="logout" onPress={logout} />
            <PaperAppBar.Action icon="update" onPress={fetchNews} />
        </PaperAppBar.Header>
    )
};

export default memo(Appbar);
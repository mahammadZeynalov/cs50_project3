import React from 'react';
import { Appbar as PaperAppBar } from 'react-native-paper';
import { useAuthStore } from '../store/authStore';

const Appbar: React.FC = () => {

    const logout = useAuthStore(state => state.logout);
    
    return (
        <PaperAppBar.Header>
            <PaperAppBar.Content title="News" />
            <PaperAppBar.Action icon="logout" onPress={logout} />
            <PaperAppBar.Action icon="update" onPress={() => {}} />
        </PaperAppBar.Header>
    )
};

export default Appbar;
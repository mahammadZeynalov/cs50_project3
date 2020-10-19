import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Error from '../components/Error';
import { theme } from '../utils';
import { emailValidator, passwordValidator } from '../utils';
import { Navigation } from '../types';
import { useAuthStore } from '../store/authStore';
import Spinner from 'react-native-loading-spinner-overlay';

type Props = {
    navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const login = useAuthStore(state => state.login);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const _onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        } else {
            try {
                setLoading(true);
                await login(email.value, password.value);
            } catch (error) {
                setError(error.response.data)
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('Home')} />

            <Logo />

            <Header>Sign In</Header>

            <Error error = {error}/>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

            <Button mode="contained" onPress={_onLoginPressed}>
                Login
      </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
            />
        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    loadingWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    }
});

export default memo(LoginScreen);
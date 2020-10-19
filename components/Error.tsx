import React from 'react';
import { Text } from 'react-native';

interface IProps {
    error: string
}

const Error = ({ error }: IProps) => {
    if (!!error) return <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{error}</Text>
    else return null
}

export default Error;
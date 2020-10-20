import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Card as PaperCard, Title, Paragraph } from 'react-native-paper';
import { defaultImage, theme } from '../utils';
import { Caption } from 'react-native-paper';
import moment from 'moment';

interface IProps {
    url: string
    title: string
    description: string
    urlToImage: string
    publishedAt: string
    name: string
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 3,
        borderColor: theme.colors.secondary,
        margin: 10
    },
    captions: {
        justifyContent: 'space-between'
    }
})

const Card = (props: IProps) => {
    return (
        <PaperCard style={styles.card}>
            <PaperCard.Content style={{ marginBottom: 10 }}>
                <TouchableOpacity onPress={() => Linking.openURL(props.url)}>
                    <Title style={{ marginBottom: 10, textDecorationLine: 'underline' }}>{props.title}</Title>
                </TouchableOpacity>

                <Paragraph>{props.description}</Paragraph>
            </PaperCard.Content>
            <PaperCard.Cover source={{ uri: props.urlToImage ? props.urlToImage : defaultImage }} style={{ padding: 10 }} />
            <PaperCard.Actions style={styles.captions}>
                <Caption>{props.name}</Caption>
                <Caption>{moment(props.publishedAt).fromNow()}</Caption>
            </PaperCard.Actions>
        </PaperCard>
    )
};

export default memo(Card);
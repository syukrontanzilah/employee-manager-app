import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import { colors } from '../utils/colors'
import { image1 } from '../asset/image'


const List = ({picture, name, position, onPress}) => {
    return (
        <Card
        onPress={onPress}
        style={styles.card}>
            <View style={styles.content}>
                <View style={styles.avatar}>
                    <Image source={picture} style={styles.avatar} />
                </View>
                <View style={styles.wrapText}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.position}>{position}</Text>
                </View>
            </View>


        </Card>
    )
}

export default List

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        elevation: 3
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        backgroundColor: colors.bckg
    },
    wrapText: {
        paddingLeft: 10,
        flex: 1,
        maxWidth: '90%'
    },
    name: {
        fontSize: 18,
        marginBottom:2
    },
    position: {
        fontSize: 14,
        color: colors.gray2
    }
})

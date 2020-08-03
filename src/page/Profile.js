import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native'
import { colors } from '../utils/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { image3 } from '../asset/image'
import { Card, Title } from 'react-native-paper'
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';


const ListItem = ({ icon, title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.list}>
            <MaterialIcons name={icon} size={20} color="#474747" />
            <Text style={styles.name}>{title}</Text>
        </TouchableOpacity>
    )
}

const ButtonIcon = ({ icon, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}>
            <Entypo name={icon} size={20} color="#474747" />
        </TouchableOpacity>
    )
}


const Profile = () => {
    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL("tel:12345678")
        } else {
            Linking.openURL("telprompt:123456")
        }
    }
    return (
        <View style={styles.page}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    style={{ height: 100, }}
                    colors={["purple", "violet", '#ebebeb']}
                />
                {/* photo profile */}
                <Card style={styles.wrapAvatar}>
                    <Image source={{ uri: image3 }} style={styles.avatar} />
                </Card>
                {/* name and position profile */}
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Title>Muhammad Bilal</Title>
                    <Text style={styles.prof}>Frontend Developer</Text>
                </View>
                {/* description */}
                <Card style={styles.cardContent}>
                    <ListItem
                        onPress={() => {
                            Linking.openURL("mailto:muhammadbilal@gmail.com")
                        }}
                        icon="email" title="muhammadbilal@gmail.com" />
                    <ListItem
                        onPress={openDial}
                        icon="phone" title="0812998293" />
                    <ListItem icon="data-usage" title="25000000" />
                </Card>

                <View style={styles.wrapButton}>
                    <ButtonIcon icon="edit" />
                    <ButtonIcon icon="trash" />
                </View>


            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.bckg
    },
    wrapAvatar: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
        alignSelf: 'center',
        elevation: 3,
        marginTop: -50,
        alignItems: 'center'
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
        backgroundColor: colors.gray2
    },
    prof: {
        color: colors.gray1,
        fontSize: 18
    },
    cardContent: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 30,
        marginTop: 10
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 10,
        borderBottomColor: colors.bckg,
        borderBottomWidth: 1,

    },
    name: {
        fontSize: 18,
        color: colors.gray1,
        paddingLeft: 10,
        maxWidth: '95%'
    },
    wrapButton: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'flex-end'
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'wheat',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    }
})

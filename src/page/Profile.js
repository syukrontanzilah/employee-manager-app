import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { Card, Title } from 'react-native-paper'
import { image3 } from '../asset/image'
import Gap from '../component/Gap'
import { colors } from '../utils/colors'


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

const Profile = (props) => {
    const { _id, name, picture, salary, phone, email, position } = props.route.params.item
    console.log(_id)
    const deleteEmployee = () => {
        fetch("http://192.168.43.140:3000/delete", {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .then(deletedEmp => {
                Alert.alert(`${deletedEmp.name} -  berhasil dihapus`)
                props.navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("Terjadi kesalahan")
            })
    }

    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`)
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
                    <Image source={{ uri: picture }} style={styles.avatar} />
                </Card>
                {/* name and position profile */}
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Title>{name}</Title>
                    <Text style={styles.prof}>{position}</Text>
                </View>
                {/* description */}
                <Card style={styles.cardContent}>
                    <ListItem
                        onPress={() => {
                            Linking.openURL(`mailto:${email}`)
                        }}
                        icon="email" title={email} />
                    <ListItem
                        onPress={openDial}
                        icon="phone" title={phone} />
                    <ListItem icon="data-usage" title={salary} />
                </Card>

                <View style={styles.wrapButton}>
                    <ButtonIcon
                        onPress={() => {
                            props.navigation.navigate('Input Form', {
                                _id, name, picture, salary, phone, email, position
                            })
                        }}
                        icon="edit" />
                    <ButtonIcon
                        icon="trash"
                        onPress={() => deleteEmployee()} />
                </View>

                <Gap height={40} />
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

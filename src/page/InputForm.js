import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import React, { useState } from 'react'
import { Alert, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Gap from '../component/Gap'
import { colors } from '../utils/colors'

// component input
const Input = ({ value, label, onChangeText, keyboardType }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <TextInput
                label={label}
                value={value}
                mode="outlined"
                theme={theme}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    )
}

const theme = {
    colors: {
        primary: 'purple'
    }
}

const InputForm = ({ navigation, route }) => {
    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
                case "salary":
                    return route.params.salary
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [position, setPosition] = useState(getDetails("position"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [modal, setModal] = useState(false)

    // MENYIMPAN DATA
    const submitData = () => {
        fetch("http://192.168.43.140:3000/send-data", {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                position,
                salary,
                picture,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} berhasil disimpan`)
                navigation.navigate("Home")
            })
            .catch(err => {
                alert.alert("Terjadi kesalahan")
            })

    }

    // MENG-EDIT DATA
    const updateDetails = () => {
        fetch("http://192.168.43.140:3000/update", {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                position,
                salary,
                picture,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} berhasil di update`)
                navigation.navigate("Home")
            })
            .catch(err => {
                alert.alert("Terjadi kesalahan")
            })
    }

    // MENGAMBIL FOTO DARI GALLERY
    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("Ops terjadi kesalahan")
        }
    }

    // MENGAMBIL FOTO DARI CAMERA
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("Ops terjadi kesalahan")
        }
    }

    // MENGUPLOAD FOTO KE CLOUD
    const handleUpload = (image) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "employeeApp")
        data.append("cloud_name", "Rubicamp")
        fetch("https://api.cloudinary.com/v1_1/rubicamp/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setPicture(data.url)
                setModal(false)
            }).catch(err => {
                alert.alert("Terjadi kesalahan saat upload foto")
            })
    }

    return (
        <View style={styles.page}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Gap height={15} />
                <Input
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)} />
                <Input
                    label="Phone"
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={text => setPhone(text)} />
                <Input
                    label="Email"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)} />
                <Input
                    label="Position"
                    value={position}
                    onChangeText={text => setPosition(text)} />
                <Input
                    label="Salary"
                    value={salary}
                    keyboardType="number-pad"
                    onChangeText={text => setSalary(text)} />
                <Gap height={20} />
                {/* BUTTON UPLOAD IMAGE */}
                <Button
                    icon={picture === "" ? "upload" : "check"}
                    mode="contained"
                    color="purple"
                    onPress={() => setModal(true)}>
                    Upload Image
                </Button>

                <Gap height={20} />
                {
                    route.params ?
                        <Button
                            onPress={() => updateDetails()}
                            icon="content-save"
                            mode="contained"
                            color="purple"
                        >
                            Update Details
                     </Button>
                        :
                        <Button
                            onPress={() => submitData()}
                            icon="content-save"
                            mode="contained"
                            color="purple"
                        >
                            Save
                        </Button>
                }
                <Gap height={20} />
                {/* MODAL PILIH CAMERA/GALLERY */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.viewModal}>
                        <View style={styles.viewButton}>
                            <Button icon="camera" mode="contained"
                                onPress={() => pickFromCamera()}>
                                Camera
                        </Button>
                            <Button icon="camera" mode="contained"
                                onPress={() => pickFromGallery()}>
                                Gallery
                        </Button>
                        </View>
                        <Button icon="camera" color="darkred"
                            onPress={() => setModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

export default InputForm

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.bckg,
        paddingHorizontal: 20
    },
    viewModal: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        backgroundColor: colors.white,
        paddingBottom: 10
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

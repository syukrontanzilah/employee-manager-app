import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native'
import { colors } from '../utils/colors'
import { TextInput, Button } from 'react-native-paper'
import Gap from '../component/Gap'

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


const InputForm = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [modal, setModal] = useState(false)

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
                <Button icon="upload" mode="contained" color="purple" onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                <Gap height={20} />
                <Button icon="content-save" mode="contained" color="purple" 
                >
                    Save
                </Button>
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
                                onPress={() => setModal(false)}>
                                Camera
                        </Button>
                            <Button icon="camera" mode="contained"
                                onPress={() => setModal(false)}>
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

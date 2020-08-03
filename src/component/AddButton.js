import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper';
import { colors } from '../utils/colors';

const AddButton = ({ onPress }) => {
    return (
        <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"purple"}}}
            onPress={onPress}
        />
    )
}

export default AddButton

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

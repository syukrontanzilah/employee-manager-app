import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import { Card } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';
import List from '../component/List';
import { colors } from '../utils/colors';
import AddButton from '../component/AddButton';
import Gap from '../component/Gap';
import { image1, image2, image3 } from '../asset/image';


const Home = ({ navigation }) => {
    const data = [
        {id: 1, name: "Alfia Nindiyani", position:"Secretary", picture: image1},
        {id: 2, name: "Halimah Shafa Maulida Alfi", position:"Marketing", picture: image2},
        {id: 3, name: "Muhammad Bilal", position:"Frontend Developer", picture: image3}
    ]

const renderList = ((item)=>{
return(
    <List
    onPress={() => navigation.navigate('Profile')}
    name={item.name}
    position={item.position}
    picture={{ uri: item.picture }} />  
)
})
    return (
        <View style={styles.page}>
            <StatusBar />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* {renderList} */}
                    <FlatList
                    data={data}
                    renderItem={({item})=>{
                      return renderList(item)
                    }}
                    keyExtractor={item=>`${item.id}`}
                    />
                </View>
                <Gap height={100} />
            </ScrollView>
            <AddButton onPress ={()=> navigation.navigate('Input Form')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.bckg
    },
    content: {
        paddingHorizontal: 5,
        paddingVertical: 5
    }
})

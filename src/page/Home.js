import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../component/AddButton';
import Gap from '../component/Gap';
import List from '../component/List';
import { colors } from '../utils/colors';

const Home = ({ navigation }) => {
    // const data = [
    //     { _id: 1, name: "Alfia Nindiyani", email: "alfianindiyani.gmail.com", phone: "0821234567", position: "Secretary", salary: "7000000", picture: image1 },
    //     { _id: 2, name: "Halimah Shafa Maulida Alfi", email: "halimah@gmail.com", phone: "081556565661", position: "Marketing", salary: "8000000", picture: image2 },
    //     { _id: 3, name: "Muhammad Bilal", email: "muhammadbilal@yahoo.com", phone: "084998933434", position: "Frontend Developer", salary: "10500000", picture: image3 }
    // ]
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => {
        return state
    })

    const fetchData = () => {
        fetch("http://192.168.43.140:3000/")
            .then(res => res.json())
            .then(results => {
                // setData(results)
                // setLoading(false)
                dispatch({type: "ADD_DATA", payload: results})
                dispatch({type: "SET_LOADING",payload: false})
            }).catch(err => {
                alert.alert("Terjadi kesalahan")
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderList = ((item) => {
        return (
            <List
                onPress={() => navigation.navigate('Profile', { item })}
                name={item.name}
                position={item.position}
                picture={{ uri: item.picture }} />
        )
    })
    return (
        <View style={styles.page}>
            <StatusBar />
            {/* <ScrollView
                showsVerticalScrollIndicator={false}> */}
            <View style={styles.content}>
                {/* {renderList} */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => item.id}
                    onRefresh={() => fetchData()}
                    refreshing={loading}
                />
                <Text style={styles.textDesc}>Skip ke bawah untuk me-refresh..</Text>
            </View>
            <Gap height={100} />
            {/* </ScrollView> */}
            <AddButton onPress={() => navigation.navigate('Input Form')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.bckg,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    content: {

    },
    textDesc: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 13,
        color: 'gray'
    }
})

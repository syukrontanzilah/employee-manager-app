import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import EditForm from './src/page/EditForm';
import Home from './src/page/Home';
import InputForm from './src/page/InputForm';
import Profile from './src/page/Profile';
import { colors } from './src/utils/colors';


const Stack = createStackNavigator();


const MainApp =()=>{
  return(
   <Stack.Navigator>
     <Stack.Screen name="Home" component={Home}/>
     <Stack.Screen name="Input Form" component={InputForm}/>
     <Stack.Screen name="Profile" component={Profile} 
     options ={{
       title:"Profile",
       headerTintColor: "wheat",
       headerStyle:{
         backgroundColor:'purple'
       }
     }}/>
     <Stack.Screen name="Edit Form" component={EditForm}/>
   </Stack.Navigator>
  )
}

const App =() =>{
  return (
    <NavigationContainer>
       <MainApp/>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
});

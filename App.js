import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import Home from './src/page/Home';
import InputForm from './src/page/InputForm';
import Profile from './src/page/Profile';
import { colors } from './src/utils/colors';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'

const store = createStore(reducer)
const Stack = createStackNavigator();


const MainApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Input Form" component={InputForm} />
      <Stack.Screen name="Profile" component={Profile}
        options={{
          title: "Profile",
          headerTintColor: "wheat",
          headerStyle: {
            backgroundColor: 'purple'
          }
        }} />
    </Stack.Navigator>
  )
}

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </Provider>

  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
});

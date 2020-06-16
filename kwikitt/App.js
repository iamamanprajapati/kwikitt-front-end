import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import RootStackScreen from './StartScreen/RootStackScreen'
const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    )
}
export default App;
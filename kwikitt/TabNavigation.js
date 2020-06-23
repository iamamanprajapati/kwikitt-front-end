import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { PartnerScreen } from './TabScreen/PartnerScreen'
import { ProfileScreen } from "./TabScreen/ProfileScreen";
import { MyOrders } from "./TabScreen/MyOrders";
import { Home } from "./Home";

const Tab = createMaterialBottomTabNavigator();

export class TabNavigation extends Component {
    render() {

        return (
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#e91e63"
                style={{ backgroundColor: 'tomato' }}
            >

                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="PartnerScreen"
                    component={PartnerScreen}
                    options={{
                        tabBarLabel: 'Partner',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="handshake-o" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{
                        tabBarLabel: 'Orders',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cart-outline" color={color} size={26} />
                        ),
                    }}
                />      

                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" color={color} size={26} />
                        ),
                    }}
                />

            </Tab.Navigator>
        )
    }
}

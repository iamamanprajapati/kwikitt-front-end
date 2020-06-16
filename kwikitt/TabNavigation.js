import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileScreen } from './TabScreen/ProfileScreen'
import { UpdateScreen } from "./TabScreen/UpdateScreen";
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
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="profile" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Update"
                    component={UpdateScreen}
                    options={{
                        tabBarLabel: 'Update',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="update" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{
                        tabBarLabel: 'MyOrders',
                        tabBarColor: '#40008c',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="orders" color={color} size={26} />
                        ),
                    }}
                />

            </Tab.Navigator>
        )
    }
}

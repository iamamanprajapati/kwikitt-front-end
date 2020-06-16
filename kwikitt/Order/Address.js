import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, StatusBar, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage';

export class Address extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            userId: null,
            orderId:null
        }
    }

    getData = async () => {
        console.warn('getting')
        try {
            const value = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value)
            this.setState({ userId: abcd })
            console.warn(this.state.userId)
                const id = this.state.userId
                axios.get(`http://147.139.33.186/api/address/list/${id}`)
            .then(response => {
                this.setState({
                    data: response.data.data,
                })
            })
        } catch (e) {
            console.warn(e)
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { data } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddAddress',{id:this.state.userId})}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, { color: '#fff' }]}>+ Add New Address</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        data.map(j => (
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('placeOrder',{addId:j.id})}
                            >
                                <ImageBackground style={{ marginTop: 5, marginLeft: 5, marginRight: 5, padding: 5, backgroundColor: 'white', borderWidth: 4, borderColor: 'white', marginTop: 4, elevation: 4, height: 170 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <Text>{j.city},</Text>
                                            <Text>{j.pinCode},</Text>
                                            <Text >{j.street},</Text>
                                            <Text>{j.state},</Text>
                                            <Text>{j.id}</Text>
                                            <Text>{this.state.userId}</Text>
                                        </View>
                                        <View style={{ flex: .25, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flex: .33 }}>
                                                <TouchableOpacity style={{ borderRadius: 5, height: 40, width: 40 }}
                                                    onPress={() => {
                                                        this.props.navigation.navigate('EditAddress', {
                                                            id1: j.id, street1: j.street
                                                        })
                                                    }}
                                                >
                                                    <Icon
                                                        size={20}
                                                        reverse
                                                        name='edit'
                                                        type='font-awesome'
                                                        color='green'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: .33 }}>
                                                <TouchableOpacity style={{ borderRadius: 5, height: 40, width: 40 }}>
                                                    <Icon
                                                        size={20}
                                                        reverse
                                                        name='check-square-o'
                                                        type='font-awesome'
                                                        color='orange'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flex: .33 }}>
                                                <TouchableOpacity style={{ borderRadius: 5, height: 40, width: 40 }}
                                                    onPress={() => {
                                                        axios.delete(`http://147.139.33.186/api/address/delete/${j.id}`)
                                                            .then(response => {
                                                                this.componentDidMount();
                                                            })
                                                    }}
                                                >
                                                    <Icon
                                                        size={20}
                                                        reverse
                                                        name='delete'
                                                        type='AntDesign'
                                                        color='red'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

export default Address

const styles = StyleSheet.create({
    signIn: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },

})
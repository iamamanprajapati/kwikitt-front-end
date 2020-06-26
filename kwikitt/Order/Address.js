import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, StatusBar, Image, ScrollView, Dimensions, TouchableHighlight, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage';

const Width = Dimensions.get('window').width;

export class Address extends Component {
    constructor() {
        super();
        { global.MyVar }
        this.state = {
            data: [],
            userId: null,
            orderId: null,
            names: '',
            serviceImages: '',
            desc: '',
            servId: null,
            isLoading: true
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            const abcd = JSON.parse(value)
            const value2 = await AsyncStorage.getItem('orderId')
            const serviceId = JSON.parse(value2)
            this.setState({ servId: serviceId, userId: abcd })
            const id = this.state.userId
            axios.get(`${global.MyVar}/api/address/list/${id}`)
                .then(response => {
                    this.setState({
                        data: response.data.data,
                    })
                })
            axios.get(`${global.MyVar}/service/${serviceId}`)
                .then((response) => {
                    this.setState({
                        names: response.data.name,
                        serviceImages: response.data.serviceImage,
                        desc: response.data.description,
                        isLoading: false
                    })
                })
        } catch (e) {

        }
    }

    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
            console.warn(e)
        }
    }


    refreshComponent = () => {
        this.getData()
    }


    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => this.refreshComponent())
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    render() {
        const { data } = this.state
        const { serviceImages, isLoading } = this.state

        return (
            (isLoading === true) ?
                <ActivityIndicator style={{ flex: 1 }} animating={true} size="large" color="#0000ff" />
                :
                <View style={{ flex: 1 }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddAddress', { id: this.state.userId })}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>+ Add New Address</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: Width }}>
                            <Image style={{ width: 120, height: 120, alignSelf: 'center', elevation: 4 }} source={{ uri: `${global.MyVar}/uploads/services/${serviceImages}` }} />
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>{this.state.names}</Text>
                            <Text style={{ marginTop: '5%', marginLeft: '5%', fontSize: 12 }}><Text style={{ fontWeight: 'bold', fontSize: 15 }}>Description:</Text> {this.state.desc} </Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            data.map(j => (
                                <TouchableHighlight
                                    onPress={() => this.props.navigation.navigate('placeOrder', {
                                        addId: j.id,
                                        street: j.street,
                                        city: j.city,
                                        state: j.state,
                                        pinCode: j.pinCode
                                    })}
                                >
                                    <ImageBackground style={{ marginTop: 5, marginLeft: 5, marginRight: 5, padding: 5, backgroundColor: 'white', borderWidth: 4, borderColor: 'white', marginTop: 4, height: 150 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                <Text >{j.street},</Text>
                                                <Text>{j.city},</Text>
                                                <Text>{j.pinCode},</Text>
                                                <Text>{j.state},</Text>
                                            </View>
                                            <View style={{ flex: .25, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flex: .5, }}>
                                                    <Icon
                                                        size={20}
                                                        reverse
                                                        name='edit'
                                                        type='font-awesome'
                                                        color='green'
                                                        onPress={() => {
                                                            this.props.navigation.navigate('EditAddress', {
                                                                id1: j.id, street1: j.street
                                                            })
                                                        }}
                                                    />
                                                </View>
                                                <View style={{ flex: .5 }}>
                                                    <Icon
                                                        size={20}
                                                        reverse
                                                        name='delete'
                                                        type='AntDesign'
                                                        color='red'
                                                        onPress={() => {
                                                            axios.delete(`${global.MyVar}/api/address/delete/${j.id}`)
                                                                .then(response => {
                                                                    this.componentDidMount();
                                                                })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </TouchableHighlight>
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